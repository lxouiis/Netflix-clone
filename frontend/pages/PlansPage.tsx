import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PLANS } from "../constants";
import { SubscriptionStatus } from "../types";

const API_BASE = "http://localhost:5050";
const STRANGER_THINGS_URL = "/strangerthings/index.html"; // ✅ uses same frontend port (3001)

const PlansPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "Guest";

  const [selectedPlanId, setSelectedPlanId] = useState<string>(PLANS[2].id); // Default to Standard
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [backendStatus, setBackendStatus] = useState<string>("");

  const selectedPlan = useMemo(
    () => PLANS.find((p) => p.id === selectedPlanId),
    [selectedPlanId]
  );

  const planNameForBackend = selectedPlan?.name;

  const handleSubscribe = async () => {
    setApiError("");

    if (!selectedPlan) {
      setApiError("Please select a plan first.");
      return;
    }

    // backend expects planName to be one of Basic/Standard/Premium
    const validPlans = ["Basic", "Standard", "Premium"];
    if (!planNameForBackend || !validPlans.includes(planNameForBackend)) {
      setApiError(
        `Plan name mismatch. Backend expects: ${validPlans.join(
          ", "
        )}. Your selected plan is: ${selectedPlan.name}`
      );
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: email,
          planName: planNameForBackend,
          durationMonths: 1,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setApiError(json.error || json.message || "Subscription failed.");
        setIsLoading(false);
        return;
      }

      // ✅ Success UI
      setIsSubscribed(true);
      setBackendStatus(
        json?.subscriptionStatus ||
          json?.subscription?.subscriptionStatus ||
          "Active"
      );

      // ✅ Wait a bit so user sees "Status: Active", then redirect
      setTimeout(() => {
        window.location.href = STRANGER_THINGS_URL;
      }, 1200);

      setIsLoading(false);
    } catch (err) {
      setApiError(
        "Could not reach backend. Make sure backend is running on http://localhost:5050"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-20">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-zinc-800 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <div
          className="text-[#e50914] text-2xl md:text-3xl font-black tracking-tighter cursor-pointer"
          onClick={() => navigate("/")}
        >
          NETFLIX
        </div>
        <button
          className="text-white font-bold text-lg hover:underline"
          onClick={() => navigate("/")}
        >
          Sign Out
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="mb-10">
          <p className="text-zinc-400 text-sm mb-1">
            Step <span className="font-bold text-white">2</span> of{" "}
            <span className="font-bold text-white">3</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Choose the plan that's right for you
          </h1>

          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-zinc-300">
              <svg
                className="w-5 h-5 text-[#e50914]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Watch all you want. Ad-free.</span>
            </li>
            <li className="flex items-center space-x-2 text-zinc-300">
              <svg
                className="w-5 h-5 text-[#e50914]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Recommendations just for you.</span>
            </li>
            <li className="flex items-center space-x-2 text-zinc-300">
              <svg
                className="w-5 h-5 text-[#e50914]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Change or cancel your plan anytime.</span>
            </li>
          </ul>

          <p className="mt-4 text-sm text-zinc-500">
            Account: <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        {/* Error */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/40 rounded-lg text-red-200 text-sm">
            {apiError}
          </div>
        )}

        {/* ✅ Success Status */}
        {isSubscribed && (
          <div className="mb-8 p-5 bg-zinc-900 border border-green-500/50 rounded-lg flex items-center space-x-4 animate-pulse">
            <div className="bg-green-500 rounded-full p-1.5">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-green-400 text-lg tracking-wide uppercase">
                Status: {backendStatus || SubscriptionStatus.ACTIVE}
              </p>
              <p className="text-sm text-zinc-400">
                Redirecting to Stranger Things...
              </p>
            </div>
          </div>
        )}

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              onClick={() => !isSubscribed && setSelectedPlanId(plan.id)}
              className={`relative cursor-pointer transition-all duration-300 transform rounded-2xl border-2 overflow-hidden flex flex-col group
                ${
                  selectedPlanId === plan.id
                    ? "border-[#e50914] scale-105 ring-4 ring-[#e50914]/20 shadow-[0_0_30px_rgba(229,9,20,0.3)]"
                    : "border-zinc-800 hover:border-zinc-600 bg-zinc-900/50"
                }
                ${
                  isSubscribed && selectedPlanId !== plan.id
                    ? "opacity-30 pointer-events-none scale-95"
                    : ""
                }
              `}
            >
              <div
                className={`p-5 h-36 flex flex-col justify-end bg-gradient-to-br ${plan.gradient} text-white`}
              >
                <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
                <p className="text-xs uppercase font-bold tracking-widest opacity-80">
                  {plan.resolution}
                </p>
              </div>

              <div className="p-6 flex-1 flex flex-col space-y-5 bg-zinc-900">
                <div>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">
                    Monthly Price
                  </p>
                  <p className="text-xl font-bold text-white">
                    ₹{plan.monthlyPrice}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">
                    Video Quality
                  </p>
                  <p className="text-sm text-zinc-200 font-medium">
                    {plan.videoQuality}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">
                    Devices
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {plan.supportedDevices}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary + Subscribe */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl mb-12 backdrop-blur-sm">
          <h4 className="text-2xl font-black mb-6 text-white border-b border-zinc-800 pb-4">
            Order Summary
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Selected Plan</span>
              <span className="font-bold text-white">{selectedPlan?.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Resolution</span>
              <span className="font-bold text-white">
                {selectedPlan?.resolution}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Simultaneous Screens</span>
              <span className="font-bold text-white">
                {selectedPlan?.screensAllowed}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
              <span className="text-zinc-400">Monthly Billing</span>
              <span className="font-bold text-[#e50914]">
                ₹{selectedPlan?.monthlyPrice}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-zinc-500 max-w-xl text-center md:text-left">
              By clicking Subscribe, you agree to our{" "}
              <span className="text-zinc-300 underline cursor-pointer">
                Terms of Use
              </span>{" "}
              and acknowledge that Netflix will automatically continue your
              membership until you cancel.
            </p>

            <button
              onClick={handleSubscribe}
              disabled={isSubscribed || isLoading}
              className={`w-full md:w-auto px-12 py-5 rounded-lg text-xl font-black transition-all shadow-xl uppercase tracking-wider
                ${
                  isSubscribed
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed border border-zinc-600"
                    : isLoading
                    ? "bg-zinc-700 text-zinc-300 cursor-wait border border-zinc-600"
                    : "bg-[#e50914] text-white hover:bg-[#b20710] hover:scale-105 active:scale-95"
                }
              `}
            >
              {isSubscribed
                ? "Membership Active"
                : isLoading
                ? "Subscribing..."
                : "Subscribe Now"}
            </button>
          </div>
        </div>

        <footer className="mt-20 border-t border-zinc-800 pt-10 pb-20">
          <p className="text-zinc-500 text-sm mb-8 font-medium">
            Questions? Call 000-800-919-1743
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-xs text-zinc-500">
            <span className="hover:underline cursor-pointer">FAQ</span>
            <span className="hover:underline cursor-pointer">Help Centre</span>
            <span className="hover:underline cursor-pointer">Netflix Shop</span>
            <span className="hover:underline cursor-pointer">Terms of Use</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">
              Cookie Preferences
            </span>
            <span className="hover:underline cursor-pointer">
              Corporate Information
            </span>
            <span className="hover:underline cursor-pointer">Contact Us</span>
          </div>
          <p className="text-zinc-600 text-[10px] mt-12 uppercase tracking-tighter">
            Netflix India
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PlansPage;
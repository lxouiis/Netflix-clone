import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { HERO_BG } from "../constants";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (value: string) => {
    const e = value.trim();
    if (!e) return false;
    if (e.includes(" ")) return false;

    const at = e.indexOf("@");
    if (at <= 0) return false;

    const dot = e.indexOf(".", at + 2);
    if (dot === -1) return false;
    if (dot === e.length - 1) return false;

    return true;
  };

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    navigate(`/plans?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 z-10 bg-black/40 netflix-gradient" />

      <Navbar />

      {/* Hero Content */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pt-20">
        <h1 className="text-3xl md:text-6xl font-black mb-4">
          Unlimited movies, TV shows and more
        </h1>

        <p className="text-xl md:text-2xl mb-6">
          Starts at ₹149. Cancel at any time.
        </p>

        <p className="text-lg md:text-xl mb-8">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form
          onSubmit={handleGetStarted}
          className="w-full max-w-2xl flex flex-col md:flex-row gap-2 md:gap-0"
        >
          {/* Email + Error */}
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="Email address"
              className="w-full px-4 py-4 md:py-5 bg-black/40 border border-gray-500 rounded md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-white text-lg"
            />

            {error && (
              <p className="text-left text-sm text-red-400 mt-2">
                {error}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-[#e50914] text-white px-8 py-4 md:py-5 rounded md:rounded-l-none text-xl md:text-2xl font-bold flex items-center justify-center hover:bg-[#b20710] transition-colors whitespace-nowrap"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="9 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      </main>

      {/* Footer Placeholder */}
      <div className="relative z-20 w-full border-t-8 border-[#333] h-20 flex items-center justify-center mt-auto">
        <h2 className="text-2xl font-bold">Trending Now</h2>
      </div>
    </div>
  );
};

export default LandingPage;

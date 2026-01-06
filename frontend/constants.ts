import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 199,
    videoQuality: 'Good',
    resolution: '720p (HD)',
    screensAllowed: 1,
    supportedDevices: 'TV, computer, mobile phone, tablet',
    gradient: 'from-indigo-800 to-indigo-500'
  },
  {
    id: 'standard',
    name: 'Standard',
    monthlyPrice: 499,
    videoQuality: 'Great',
    resolution: '1080p (Full HD)',
    screensAllowed: 2,
    supportedDevices: 'TV, computer, mobile phone, tablet',
    gradient: 'from-purple-800 to-purple-500'
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 649,
    videoQuality: 'Best',
    resolution: '4K (Ultra HD) + HDR',
    screensAllowed: 4,
    supportedDevices: 'TV, computer, mobile phone, tablet',
    gradient: 'from-red-800 to-red-500'
  }
];

export const NETFLIX_RED = '#e50914';
export const HERO_BG =
  'https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c2-283a-4577-a212-292f9d99d19a/7a42a98f-4f40-4286-905c-300f2e05943a/IN-en-20220502-popsignuptwoweeks-perspective_alpha_website_large.jpg';
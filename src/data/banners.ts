import { Banner } from '../types';
import { GAME_THUMBNAIL_URLS } from './games';

export const banners: Banner[] = [
  {
    id: 1,
    title: 'ROBLOX CASHBACK 70%',
    subtitle: 'Get extra Robux bonus on every top-up today!',
    discountBadge: '70% OFF',
    image: GAME_THUMBNAIL_URLS.Roblox,
    buttonText: 'Topup Now',
    bgColor: '#E6F2E4',
  },
  {
    id: 2,
    title: 'GENSHIN IMPACT UPDATE',
    subtitle: 'Genesis Crystals bonus up to +1200 crystals!',
    discountBadge: '2X BONUS',
    image: GAME_THUMBNAIL_URLS['Genshin Impact'],
    buttonText: 'Claim Bonus',
    bgColor: '#A8C88A',
  },
  {
    id: 3,
    title: 'PUBG MOBILE UC FESTIVAL',
    subtitle: 'Instant delivery on all UC packages with extra bonus UC!',
    discountBadge: 'HOT SALE',
    image: GAME_THUMBNAIL_URLS['PUBG Mobile'],
    buttonText: 'Get UC',
    bgColor: '#A8C88A',
  },
  {
    id: 4,
    title: 'HONOR OF KINGS CHAMPIONSHIP',
    subtitle: 'Exclusive Tokens deal for legendary hero skins!',
    discountBadge: 'SPECIAL DEAL',
    image: GAME_THUMBNAIL_URLS['Honor of Kings'],
    buttonText: 'Topup Tokens',
    bgColor: '#E6F2E4',
  },
  {
    id: 5,
    title: 'MOBILE LEGENDS WEEKLY PASS',
    subtitle: 'Unlock 220 Diamonds + StarLight membership points!',
    discountBadge: 'BEST VALUE',
    image: GAME_THUMBNAIL_URLS['Mobile Legends'],
    buttonText: 'Buy Pass',
    bgColor: '#E6F2E4',
  },
];

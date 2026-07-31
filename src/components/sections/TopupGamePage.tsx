import React, { useState } from 'react';
import { Game, TopupPackage } from '../../types';
import { DEFAULT_GAME_IMAGE } from '../../data/games';
import { PlayerIdGuideModal } from '../common/PlayerIdGuideModal';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Gem,
  Coins,
  Ticket,
  CreditCard,
  QrCode,
  Building2,
  Smartphone,
  Check,
  Search,
  UserCheck,
  Clock,
  Copy,
  Receipt,
  X,
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { Button } from '../ui/Button';

interface TopupGamePageProps {
  game: Game;
  onBack: () => void;
}

// Currency-aware package visual: icon + color derived from the amount label,
// so each game's packages show its own currency style without external images.
const getPackageVisual = (amount: string) => {
  const a = amount.toLowerCase();
  if (/pass|membership|welkin|blessing/.test(a))
    return { Icon: Ticket, color: 'text-purple-500 dark:text-purple-400' };
  if (/diamond/.test(a))
    return { Icon: Gem, color: 'text-sky-500 dark:text-sky-400' };
  if (/rub(y|ies)/.test(a))
    return { Icon: Gem, color: 'text-red-500 dark:text-red-400' };
  if (/crystal|shard|monochrome|oneiric/.test(a))
    return { Icon: Gem, color: 'text-indigo-500 dark:text-indigo-400' };
  if (/gem|essence/.test(a))
    return { Icon: Gem, color: 'text-emerald-500 dark:text-emerald-400' };
  if (/\buc\b|\bcp\b|token|voucher|robux|core|coin|point/.test(a))
    return { Icon: Coins, color: 'text-amber-500 dark:text-amber-400' };
  return { Icon: Sparkles, color: 'text-amber-500 dark:text-amber-400' };
};

const getPackageImage = (amount: string) => {
  const a = amount.toLowerCase();
  if (/pass|membership|welkin|blessing|booster|weekly/.test(a)) {
    return 'https://img.icons8.com/fluency/96/ticket.png';
  }
  if (/bundle|pack|plan/.test(a)) {
    return 'https://img.icons8.com/fluency/96/gift.png';
  }
  if (/\buc\b|cp\b|token|voucher|robux|core|coin|point|diamond|gem|crystal|shard|monochrome|oneiric|essence|rub(y|ies)/.test(a)) {
    return 'https://img.icons8.com/fluency/96/diamond-ring.png';
  }
  if (/cash|pay|fee|bonus/.test(a)) {
    return 'https://img.icons8.com/fluency/96/cash.png';
  }
  return 'https://img.icons8.com/fluency/96/coins.png';
};

export const TopupGamePage: React.FC<TopupGamePageProps> = ({ game, onBack }) => {
  // Step 1: User Account State
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [verifiedAccount, setVerifiedAccount] = useState<{
    name: string;
    server: string;
    status: 'success' | 'none';
  } | null>(null);

  // Topup Packages
  const defaultPackages: TopupPackage[] = [
    { id: 'p-1', amount: 'Weekly Diamond Pass', price: '$1.52', bonus: 'Weekly Pass', image: getPackageImage('Weekly Diamond Pass') },
    { id: 'p-2', amount: '55 Diamonds', price: '$0.92', bonus: '+5 Free', image: getPackageImage('55 Diamonds') },
    { id: 'p-3', amount: '86 Diamonds', price: '$1.30', bonus: '+8 Free', image: getPackageImage('86 Diamonds') },
    { id: 'p-4', amount: '172 Diamonds', price: '$2.59', bonus: '+16 Free', image: getPackageImage('172 Diamonds') },
    { id: 'p-5', amount: '257 Diamonds', price: '$3.59', bonus: '+25 Free', image: getPackageImage('257 Diamonds') },
    { id: 'p-6', amount: '429 Diamonds', price: '$5.99', bonus: '+43 Free', image: getPackageImage('429 Diamonds') },
    { id: 'p-7', amount: '514 Diamonds', price: '$6.99', bonus: '+52 Free', image: getPackageImage('514 Diamonds') },
    { id: 'p-8', amount: '600 Diamonds', price: '$7.99', bonus: 'Popular', image: getPackageImage('600 Diamonds') },
    { id: 'p-9', amount: '706 Diamonds', price: '$9.49', bonus: '+70 Free', image: getPackageImage('706 Diamonds') },
    { id: 'p-10', amount: '792 Diamonds', price: '$10.69', bonus: 'Best Value', image: getPackageImage('792 Diamonds') },
  ];

  const packages = game.topupPackages && game.topupPackages.length > 0
    ? game.topupPackages
    : defaultPackages;

  // Step 2: Selected Package
  const [selectedPackage, setSelectedPackage] = useState<TopupPackage>(packages[0]);

  // Step 3: Payment Channels
  const paymentChannels = [
    {
      id: 'aba_khqr',
      name: 'ABA KHQR / Pay',
      badge: '0% Fee',
      logo: '/payments/aba.svg',
      description: 'Scan with ABA Mobile or any KHQR Bank App',
      bgTag: 'bg-red-500/10 text-red-600 dark:text-red-400',
    },
    {
      id: 'khqr_all',
      name: 'Bakong KHQR',
      badge: 'Instant',
      logo: 'https://api.nuget.org/v3-flatcontainer/kh.gov.nbc.bakongkhqr/1.0.0.16/icon',
      description: 'ACLEDA, Canadia, Sathapana, Vattanac & All Banks',
      bgTag: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'wing',
      name: 'Wing Bank',
      badge: 'Fast',
      logo: 'https://w7.pngwing.com/pngs/68/917/png-transparent-cambodia-money-payment-gateway-electronic-funds-transfer-cambodia-text-service-people.png',
      description: 'Pay directly using Wing App or Account',
      bgTag: 'bg-lime-500/10 text-lime-700 dark:text-lime-400',
    },
    {
      id: 'card',
      name: 'Visa / Mastercard',
      badge: 'International',
      logo: 'https://p1.hiclipart.com/preview/110/429/95/visa-mastercard-logo-credit-card-payment-card-number-atm-card-automated-teller-machine-mousepad-computer-accessory-circle-png-clipart.jpg',
      description: 'Credit or Debit Card processed securely',
      bgTag: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
  ];

  const [selectedPayment, setSelectedPayment] = useState(paymentChannels[0].id);

  // Checkout Modal State
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [copiedTxn, setCopiedTxn] = useState(false);

  // Handle Check Account
  const handleVerifyAccount = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userId.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedAccount({
        name: `Gamer_${userId.slice(-4) || '7789'}`,
        server: serverId || 'Global-01',
        status: 'success',
      });
    }, 600);
  };

  // Handle Place Order
  const handlePlaceOrder = () => {
    if (!userId.trim()) {
      const inputEl = document.getElementById('user-id-input');
      if (inputEl) {
        inputEl.focus();
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (!verifiedAccount) {
      // Auto verify if not checked yet
      setVerifiedAccount({
        name: `Gamer_${userId.slice(-4) || '8821'}`,
        server: serverId || 'Global-01',
        status: 'success',
      });
    }
    setIsCheckoutModalOpen(true);
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsPaidSuccess(true);
    }, 400);
  };

  return (
    <div className="w-full space-y-6 pb-12 animate-fade-in">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-white font-black text-xs sm:text-sm shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] hover:bg-[#E2EFE0] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Games Catalog</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#A8C88A] border border-[#1D1D1D] text-[#1D1D1D] font-extrabold text-xs shadow-[2px_2px_0px_#1D1D1D]">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Authorized Partner</span>
        </div>
      </div>

      {/* Hero Banner Header for Game */}
      <div className="relative w-full rounded-2xl border-2 border-[#1D1D1D] dark:border-zinc-700 bg-gradient-to-r from-[#E2EFE0] via-[#E2EFE0]/90 to-[#A8C88A]/60 dark:from-[#1C221F] dark:via-[#1C221F] dark:to-[#2B303C] p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src={game.image || DEFAULT_GAME_IMAGE}
              alt={game.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-contain bg-white dark:bg-zinc-900 p-1.5 border-2 border-[#1D1D1D] dark:border-zinc-700 shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = DEFAULT_GAME_IMAGE;
              }}
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#1D1D1D] text-white text-[10px] font-mono font-bold">
                <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>Instant Automatic Delivery</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1D1D1D] dark:text-white uppercase tracking-tight">
                {game.name}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-[#1D1D1D]/70 dark:text-zinc-300">
                {game.publisher} • {game.category} • ⭐ {game.rating} / 5.0
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 bg-white/90 dark:bg-[#1A1B22]/90 backdrop-blur-xs p-4 rounded-xl border-2 border-[#1D1D1D] dark:border-zinc-700 shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000]">
            <CheckCircle2 className="w-8 h-8 text-[#A8C88A]" />
            <div className="text-xs">
              <p className="font-black text-[#1D1D1D] dark:text-white">Safe & Verified</p>
              <p className="font-semibold text-gray-600 dark:text-zinc-400">Direct Official API Refill</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Content & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3 Steps Form (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: CHECK ID */}
          <div className="bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FF8A00] text-white border-2 border-[#1D1D1D] flex items-center justify-center font-black text-sm shadow-[1.5px_1.5px_0px_#1D1D1D]">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1D1D1D] dark:text-white uppercase tracking-tight">
                    Check ID / Account Details
                  </h3>
                  <p className="text-xs font-semibold text-[#1D1D1D]/60 dark:text-zinc-400">
                    Enter your Player ID & Server ID to verify account nickname
                  </p>
                </div>
              </div>

              {/* Clickable Instruction Icon/Button */}
              <button
                type="button"
                onClick={() => setIsGuideOpen(true)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E2EFE0] dark:bg-[#1E2B22] border border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-zinc-200 text-xs font-black hover:bg-[#A8C88A] transition-colors shadow-[1.5px_1.5px_0px_#1D1D1D] dark:shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                title="Click to see where to find your Player ID"
              >
                <HelpCircle className="w-4 h-4 text-[#1D1D1D] dark:text-emerald-400 stroke-[2.5]" />
                <span className="hidden sm:inline">Where to find ID?</span>
                <span className="sm:hidden">Guide</span>
              </button>
            </div>

            <form onSubmit={handleVerifyAccount} className="space-y-3 pt-1">
              <div className="grid grid-cols-12 gap-2.5 sm:gap-3">
                <div className="col-span-7">
                  <label className="block text-xs font-extrabold text-[#1D1D1D] dark:text-zinc-200 mb-1">
                    User ID / Player ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    required
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value.replace(/\D/g, ''));
                      setVerifiedAccount(null);
                    }}
                    placeholder="e.g. 123456789"
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm font-mono font-bold bg-white dark:bg-[#121318] text-[#1D1D1D] dark:text-white border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-xl shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#A8C88A]"
                  />
                </div>

                <div className="col-span-5">
                  <label className="block text-xs font-extrabold text-[#1D1D1D] dark:text-zinc-200 mb-1">
                    Server ID / Zone ID
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    value={serverId}
                    onChange={(e) => {
                      setServerId(e.target.value.replace(/\D/g, ''));
                      setVerifiedAccount(null);
                    }}
                    placeholder="e.g. 2001"
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm font-mono font-bold bg-white dark:bg-[#121318] text-[#1D1D1D] dark:text-white border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-xl shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#A8C88A]"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!userId.trim() || isVerifying}
                  className="px-6 py-2.5 text-xs font-extrabold"
                >
                  <Search className="w-4 h-4 mr-1.5" />
                  <span>{isVerifying ? 'Checking...' : 'Check Account ID'}</span>
                </Button>

                {/* Verified Account Status Indicator */}
                {verifiedAccount && (
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#A8C88A]/20 dark:bg-[#A8C88A]/10 border-2 border-[#1D1D1D] dark:border-zinc-700 text-xs font-extrabold text-[#1D1D1D] dark:text-white">
                    <UserCheck className="w-4 h-4 text-[#A8C88A]" />
                    <span>Nickname: <strong className="text-[#1D1D1D] dark:text-amber-300 font-mono">{verifiedAccount.name}</strong></span>
                    <span className="ml-auto text-[10px] bg-[#A8C88A] text-[#1D1D1D] px-1.5 py-0.5 rounded font-bold">Verified</span>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* STEP 2: CHOOSE AMOUNT / TOPUP PACKAGES */}
          <div className="bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FF8A00] text-white border-2 border-[#1D1D1D] flex items-center justify-center font-black text-sm shadow-[1.5px_1.5px_0px_#1D1D1D]">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1D1D1D] dark:text-white uppercase tracking-tight">
                    Choose Amount / Package
                  </h3>
                  <p className="text-xs font-semibold text-[#1D1D1D]/60 dark:text-zinc-400">
                    Select your preferred diamond pass or gems bundle
                  </p>
                </div>
              </div>

              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#E2EFE0] dark:bg-[#1E2B22] text-[#1D1D1D] dark:text-zinc-200 border border-[#1D1D1D] dark:border-zinc-700">
                {packages.length} Packages Available
              </span>
            </div>

            {/* Package Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {packages.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                const { Icon: PackageIcon, color: packageIconColor } = getPackageVisual(pkg.amount);
                const pkgImage = pkg.image || getPackageImage(pkg.amount);
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between items-center text-center group ${
                      isSelected
                        ? 'bg-[#A8C88A]/20 dark:bg-[#A8C88A]/15 border-[#1D1D1D] dark:border-white shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] scale-102'
                        : 'bg-white dark:bg-[#121318] border-[#1D1D1D]/40 dark:border-zinc-800 hover:border-[#1D1D1D] dark:hover:border-zinc-600 shadow-[1.5px_1.5px_0px_#1D1D1D]/20'
                    }`}
                  >
                    {/* Active Selected Check Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#A8C88A] border border-[#1D1D1D] flex items-center justify-center text-[#1D1D1D]">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    {/* Bonus Tag */}
                    {pkg.bonus && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#E2EFE0] dark:bg-[#1E2B22] text-[#1D1D1D] dark:text-amber-300 border border-[#1D1D1D] dark:border-zinc-700 mb-2">
                        {pkg.bonus}
                      </span>
                    )}

                    {/* Icon & Title */}
                    <div className="my-1.5 space-y-1">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-[#E2EFE0] dark:bg-[#20222A] border border-[#1D1D1D] dark:border-zinc-700 flex items-center justify-center shadow-[1px_1px_0px_#1D1D1D]">
                        <img
                          src={pkgImage}
                          alt={`${pkg.amount} package`}
                          className="w-6 h-6 object-contain"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const image = e.currentTarget as HTMLImageElement;
                            image.style.display = 'none';
                            const fallback = image.nextElementSibling as HTMLElement | null;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        <PackageIcon className={`w-5 h-5 ${packageIconColor} hidden`} />
                      </div>
                      <p className="font-extrabold text-xs sm:text-sm text-[#1D1D1D] dark:text-white leading-tight">
                        {pkg.amount}
                      </p>
                    </div>

                    {/* Price Tag Box */}
                    <div className={`w-full mt-2 py-1.5 px-2 rounded-xl border border-[#1D1D1D] font-black text-xs sm:text-sm text-center shadow-[1px_1px_0px_#1D1D1D] ${
                      isSelected
                        ? 'bg-[#FF4D4D] text-white'
                        : 'bg-[#FF4D4D]/90 text-white group-hover:bg-[#FF4D4D]'
                    }`}>
                      {pkg.price}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: SELECT PAYMENT METHOD */}
          <div className="bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FF8A00] text-white border-2 border-[#1D1D1D] flex items-center justify-center font-black text-sm shadow-[1.5px_1.5px_0px_#1D1D1D]">
                3
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1D1D1D] dark:text-white uppercase tracking-tight">
                  Select Payment Method
                </h3>
                <p className="text-xs font-semibold text-[#1D1D1D]/60 dark:text-zinc-400">
                  Instant processing via ABA, KHQR, Wing or Card
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {paymentChannels.map((pay) => {
                const isSelected = selectedPayment === pay.id;
                return (
                  <div
                    key={pay.id}
                    onClick={() => setSelectedPayment(pay.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#A8C88A]/20 dark:bg-[#A8C88A]/15 border-[#1D1D1D] dark:border-white shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000]'
                        : 'bg-white dark:bg-[#121318] border-[#1D1D1D]/40 dark:border-zinc-800 hover:border-[#1D1D1D] dark:hover:border-zinc-600 shadow-[1.5px_1.5px_0px_#1D1D1D]/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A1B22] border border-[#1D1D1D] dark:border-zinc-700 flex items-center justify-center p-1 shadow-[1px_1px_0px_#1D1D1D] overflow-hidden shrink-0">
                        <img
                          src={pay.logo}
                          alt={pay.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            img.onerror = null;
                            img.style.visibility = 'hidden';
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-extrabold text-sm text-[#1D1D1D] dark:text-white">
                            {pay.name}
                          </p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${pay.bgTag}`}>
                            {pay.badge}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 line-clamp-1">
                          {pay.description}
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#1D1D1D] dark:border-white bg-[#A8C88A]'
                        : 'border-gray-400 dark:border-zinc-600'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#1D1D1D]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary Side Panel (4 cols on desktop) */}
        <div className="lg:col-span-4 sticky top-20 space-y-4">
          <div className="bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] space-y-5">
            <div className="border-b-2 border-[#1D1D1D] dark:border-zinc-700 pb-3">
              <h3 className="text-base font-black text-[#1D1D1D] dark:text-white uppercase tracking-tight">
                Order Summary
              </h3>
              <p className="text-xs font-semibold text-[#1D1D1D]/60 dark:text-zinc-400">
                Review your items before payment
              </p>
            </div>

            {/* Selected Game Details */}
            <div className="flex items-center gap-3 p-3 bg-[#E2EFE0]/60 dark:bg-[#20222A] rounded-xl border border-[#1D1D1D] dark:border-zinc-700">
              <img
                src={game.image || DEFAULT_GAME_IMAGE}
                alt={game.name}
                className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-zinc-900 p-1 border border-[#1D1D1D] dark:border-zinc-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = DEFAULT_GAME_IMAGE;
                }}
              />
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm text-[#1D1D1D] dark:text-white leading-tight">{game.name}</h4>
                <p className="text-[11px] font-bold text-gray-600 dark:text-zinc-400">{game.publisher}</p>
              </div>
            </div>

            {/* Key Value Details List */}
            <div className="space-y-2 text-xs font-semibold text-[#1D1D1D] dark:text-zinc-200">
              <div className="flex justify-between pb-1 border-b border-gray-200 dark:border-zinc-800">
                <span className="text-gray-500 dark:text-zinc-400">User ID:</span>
                <span className="font-mono font-bold">{userId || 'Not entered'}</span>
              </div>

              <div className="flex justify-between pb-1 border-b border-gray-200 dark:border-zinc-800">
                <span className="text-gray-500 dark:text-zinc-400">Server ID:</span>
                <span className="font-mono font-bold">{serverId || 'Global'}</span>
              </div>

              <div className="flex justify-between pb-1 border-b border-gray-200 dark:border-zinc-800">
                <span className="text-gray-500 dark:text-zinc-400">Account Nickname:</span>
                <span className="font-bold text-[#A8C88A]">
                  {verifiedAccount ? verifiedAccount.name : 'Unchecked'}
                </span>
              </div>

              <div className="flex justify-between pb-1 border-b border-gray-200 dark:border-zinc-800">
                <span className="text-gray-500 dark:text-zinc-400">Package:</span>
                <span className="font-bold">{selectedPackage.amount}</span>
              </div>

              <div className="flex justify-between items-center pb-1 border-b border-gray-200 dark:border-zinc-800">
                <span className="text-gray-500 dark:text-zinc-400">Payment Channel:</span>
                <span className="font-bold uppercase text-xs flex items-center gap-1.5">
                  {(() => {
                    const activePay = paymentChannels.find((p) => p.id === selectedPayment);
                    return (
                      <>
                        {activePay && (
                          <img
                            src={activePay.logo}
                            alt={activePay.name}
                            className="w-4 h-4 object-contain rounded bg-white p-0.5 border border-zinc-300 dark:border-zinc-700"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <span>{activePay?.name}</span>
                      </>
                    );
                  })()}
                </span>
              </div>
            </div>

            {/* Total Price Section */}
            <div className="pt-2 border-t-2 border-[#1D1D1D] dark:border-zinc-700 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-zinc-400">Total Price:</p>
                <p className="text-2xl font-black text-[#FF4D4D]">{selectedPackage.price}</p>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#A8C88A] text-[#1D1D1D] border border-[#1D1D1D]">
                0% TAX
              </span>
            </div>

            {/* Confirm & Place Order CTA */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handlePlaceOrder}
              className="py-3 text-sm font-black uppercase tracking-wider"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Place Order ({selectedPackage.price})</span>
            </Button>

            {!userId && (
              <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 text-center flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Please fill in your User ID to proceed</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* KHQR / Payment Confirmation Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl p-6 shadow-[8px_8px_0px_#1D1D1D] dark:shadow-[8px_8px_0px_#000] space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsCheckoutModalOpen(false);
                setIsPaidSuccess(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-white hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {isPaidSuccess ? (
              /* Success Order State */
              <div className="text-center py-2 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Brand-styled Success Icon Badge */}
                <div className="relative mx-auto w-16 h-16 rounded-2xl bg-[#A8C88A] border-2 border-[#1D1D1D] flex items-center justify-center shadow-[4px_4px_0px_#1D1D1D]">
                  <CheckCircle2 className="w-9 h-9 text-[#1D1D1D] stroke-[2.5]" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#A8C88A] border border-[#1D1D1D]"></span>
                  </span>
                </div>

                <div>
                  <div className="inline-block px-3 py-0.5 rounded-full bg-[#E2EFE0] dark:bg-[#1E2B22] border border-[#1D1D1D] text-[#1D1D1D] dark:text-emerald-400 text-[11px] font-black uppercase mb-1">
                    Order Delivered
                  </div>
                  <h3 className="text-2xl font-black text-[#1D1D1D] dark:text-white uppercase tracking-tight">
                    Topup Successful!
                  </h3>
                  <p className="text-xs font-semibold text-gray-600 dark:text-zinc-300 mt-1">
                    <strong className="text-[#1D1D1D] dark:text-white">{selectedPackage.amount}</strong> has been credited to User ID <strong className="text-[#1D1D1D] dark:text-white">{userId}</strong>
                  </p>
                </div>

                {/* Receipt Card Summary */}
                <div className="p-3.5 bg-[#F8F7F3] dark:bg-[#121318] rounded-xl border-2 border-[#1D1D1D] dark:border-zinc-700 text-xs font-mono space-y-2 text-left shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-zinc-800">
                    <img
                      src={game.image || DEFAULT_GAME_IMAGE}
                      alt={game.name}
                      className="w-8 h-8 rounded-lg object-contain bg-white dark:bg-zinc-900 p-0.5 border border-[#1D1D1D]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-extrabold text-[#1D1D1D] dark:text-white leading-none">{game.name}</p>
                      <p className="text-[10px] text-gray-500">{verifiedAccount ? verifiedAccount.name : 'Verified Account'}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-zinc-400">Txn ID:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[#1D1D1D] dark:text-white">#TG-{Math.floor(100000 + Math.random() * 900000)}</span>
                      <button
                        onClick={() => {
                          setCopiedTxn(true);
                          setTimeout(() => setCopiedTxn(false), 2000);
                        }}
                        className="p-1 text-[10px] bg-white dark:bg-zinc-800 rounded border border-[#1D1D1D] hover:bg-[#A8C88A] transition-colors cursor-pointer"
                        title="Copy Txn ID"
                      >
                        {copiedTxn ? 'Copied!' : <Copy className="w-3 h-3 text-[#1D1D1D] dark:text-white" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-zinc-400">User ID / Server:</span>
                    <span className="font-bold text-[#1D1D1D] dark:text-white">{userId} ({serverId || 'Global'})</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-zinc-400">Package:</span>
                    <span className="font-bold text-[#1D1D1D] dark:text-white">{selectedPackage.amount}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-zinc-400">Amount Paid:</span>
                    <span className="font-extrabold text-[#FF4D4D] text-sm">{selectedPackage.price}</span>
                  </div>

                  <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-zinc-800">
                    <span className="text-gray-500 dark:text-zinc-400">Status:</span>
                    <span className="font-extrabold text-[#1D1D1D] bg-[#A8C88A] px-2 py-0.5 rounded border border-[#1D1D1D] text-[10px]">
                      COMPLETED ✅
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setIsPaidSuccess(false);
                    onBack();
                  }}
                  className="py-3 text-xs font-black uppercase tracking-wider"
                >
                  Return to Games Catalog
                </Button>
              </div>
            ) : (
              /* KHQR Payment Modal */
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D1D1D] text-white font-extrabold text-xs shadow-[2px_2px_0px_#A8C88A]">
                  {(() => {
                    const activePay = paymentChannels.find((p) => p.id === selectedPayment);
                    return (
                      <>
                        {activePay && (
                          <img
                            src={activePay.logo}
                            alt={activePay.name}
                            className="w-5 h-5 object-contain rounded bg-white p-0.5"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <span>Scan to Pay via {activePay?.name || 'KHQR'}</span>
                      </>
                    );
                  })()}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-500 dark:text-zinc-400">Total Amount to Pay:</p>
                  <p className="text-3xl font-black text-[#1D1D1D] dark:text-white">{selectedPackage.price}</p>
                </div>

                {/* Simulated KHQR Code Box */}
                <div className="relative mx-auto w-48 h-48 bg-white p-3 border-2 border-[#1D1D1D] rounded-xl shadow-[3px_3px_0px_#1D1D1D] flex flex-col items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center text-white space-y-2">
                    <QrCode className="w-24 h-24 text-white" />
                    <span className="text-[10px] font-mono font-bold tracking-wider text-amber-300">
                      KHQR • BAKONG PAY
                    </span>
                  </div>
                </div>

                <p className="text-xs font-bold text-[#1D1D1D] dark:text-zinc-300">
                  Scan using ABA Mobile, ACLEDA, Sathapana, or any Banking App
                </p>

                <div className="pt-2 space-y-2">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleSimulatePayment}
                    className="py-2.5 text-xs font-extrabold"
                  >
                    Simulate Payment Complete ✅
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Player ID Guide Modal */}
      <PlayerIdGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        gameName={game.name}
      />
    </div>
  );
};

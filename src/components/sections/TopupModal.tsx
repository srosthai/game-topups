import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Game } from '../../types';
import { DEFAULT_GAME_IMAGE } from '../../data/games';
import { PlayerIdGuideModal } from '../common/PlayerIdGuideModal';
import { Gamepad2, Check, CreditCard, ShieldCheck, Zap, HelpCircle, Info, CheckCircle2 } from 'lucide-react';

interface TopupModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export const TopupModal: React.FC<TopupModalProps> = ({ game, isOpen, onClose }) => {
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('Global-01');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('qris');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  if (!game) return null;

  const packages = game.topupPackages || [
    { id: 'p-1', amount: '100 Gems', price: '$0.99', bonus: '+10 Free', image: getPackageImage('100 Gems') },
    { id: 'p-2', amount: '300 Gems', price: '$2.99', bonus: '+35 Free', image: getPackageImage('300 Gems') },
    { id: 'p-3', amount: '1000 Gems', price: '$9.99', bonus: '+150 Free', image: getPackageImage('1000 Gems') },
    { id: 'p-4', amount: '2500 Gems', price: '$24.99', bonus: '+400 Free', image: getPackageImage('2500 Gems') },
  ];

  const selectedPkg = packages.find((p) => p.id === selectedPackageId) || packages[0];

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setSelectedPackageId('');
    setUserId('');
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSuccess ? 'Topup Successful!' : `Topup ${game.name}`}
      className="max-w-xl"
    >
      {isSuccess ? (
        <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative mx-auto w-16 h-16 rounded-2xl bg-[#A8C88A] border-2 border-[#1D1D1D] flex items-center justify-center shadow-[4px_4px_0px_#1D1D1D]">
            <CheckCircle2 className="w-9 h-9 text-[#1D1D1D] stroke-[2.5]" />
          </div>
          <div>
            <div className="inline-block px-3 py-0.5 rounded-full bg-[#E2EFE0] border border-[#1D1D1D] text-[#1D1D1D] text-[11px] font-black uppercase mb-1">
              Topup Completed
            </div>
            <h3 className="text-2xl font-black text-[#1D1D1D] uppercase tracking-tight">Order Placed Successfully!</h3>
            <p className="text-xs font-semibold text-gray-600 mt-1 max-w-sm mx-auto">
              Your top-up of <strong className="text-[#1D1D1D]">{selectedPkg.amount}</strong> for{' '}
              <strong className="text-[#1D1D1D]">{game.name}</strong> (User ID: {userId}) has been processed!
            </p>
          </div>
          <div className="p-3.5 bg-[#F8F7F3] rounded-xl border-2 border-[#1D1D1D] text-xs font-mono text-left space-y-1.5 shadow-[2px_2px_0px_#1D1D1D]">
            <div className="flex justify-between"><span className="text-gray-500">Txn ID:</span><span className="font-bold text-[#1D1D1D]">#TG-{Math.floor(100000 + Math.random() * 900000)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Game:</span><span className="font-bold text-[#1D1D1D]">{game.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">User ID / Server:</span><span className="font-bold text-[#1D1D1D]">{userId || '877851782'} ({serverId})</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Package:</span><span className="font-bold text-[#1D1D1D]">{selectedPkg.amount}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Total Paid:</span><span className="font-black text-[#FF4D4D] text-sm">{selectedPkg.price}</span></div>
            <div className="flex justify-between pt-1 border-t border-gray-200"><span className="text-gray-500">Status:</span><span className="font-bold text-[#1D1D1D] bg-[#A8C88A] px-2 py-0.5 rounded border border-[#1D1D1D] text-[10px]">COMPLETED ✅</span></div>
          </div>
          <Button variant="primary" fullWidth onClick={handleResetAndClose} className="py-3 text-xs font-black uppercase tracking-wider">
            Done & Return to Store
          </Button>
        </div>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
          {/* Game Banner Header */}
          <div className="flex items-center gap-3.5 p-3 bg-[#E2EFE0] border-1.5 border-[#1D1D1D] rounded-xl shadow-[2px_2px_0px_#1D1D1D]">
            <img
              src={game.image || DEFAULT_GAME_IMAGE}
              alt={game.name}
              className="w-14 h-14 rounded-xl object-contain bg-white dark:bg-zinc-900 p-1.5 border-1.5 border-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = DEFAULT_GAME_IMAGE;
              }}
            />
            <div>
              <h4 className="font-black text-lg text-[#1D1D1D] leading-tight">{game.name}</h4>
              <p className="text-xs text-[#1D1D1D]/70 font-semibold">{game.publisher} • {game.category}</p>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1D1D1D] bg-white px-2 py-0.5 rounded border border-[#1D1D1D] mt-1">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> Instant Automatic Topup
              </div>
            </div>
          </div>

          {/* Step 1: User Account Credentials */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-[#1D1D1D] uppercase tracking-wider">
                Step 1: Enter Game Account Details
              </label>
              <button
                type="button"
                onClick={() => setIsGuideOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-black text-[#1D1D1D] bg-[#E2EFE0] px-2 py-0.5 rounded-lg border border-[#1D1D1D] hover:bg-[#A8C88A] transition-colors shadow-[1px_1px_0px_#1D1D1D] cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#1D1D1D]" />
                <span>How to find ID?</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID (e.g. 12345678)"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#1D1D1D] rounded-xl shadow-[1.5px_1.5px_0px_#1D1D1D] focus:outline-none focus:ring-2 focus:ring-[#A8C88A]"
                />
              </div>
              <select
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                className="w-full px-2 py-2 text-xs font-semibold bg-white border border-[#1D1D1D] rounded-xl shadow-[1.5px_1.5px_0px_#1D1D1D] focus:outline-none"
              >
                <option value="Global-01">Global 01</option>
                <option value="Asia-01">Asia 01</option>
                <option value="NA-01">NA 01</option>
                <option value="EU-01">EU 01</option>
              </select>
            </div>
          </div>

          {/* Step 2: Select Package */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-[#1D1D1D] uppercase tracking-wider">
              Step 2: Select Top-up Package
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {packages.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id || (!selectedPackageId && pkg.id === packages[0].id);
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-3 rounded-xl border-1.5 border-[#1D1D1D] cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#A8C88A] shadow-[2px_2px_0px_#1D1D1D] font-bold'
                        : 'bg-white hover:bg-[#F8F7F3] shadow-[1px_1px_0px_#1D1D1D]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="my-1.5 space-y-1">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-[#E2EFE0] border border-[#1D1D1D] flex items-center justify-center overflow-hidden shadow-[1px_1px_0px_#1D1D1D]">
                          <img
                            src={pkg.image || getPackageImage(pkg.amount)}
                            alt={`${pkg.amount} package`}
                            className="w-6 h-6 object-contain"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <span className="text-sm font-extrabold text-[#1D1D1D]">{pkg.amount}</span>
                      </div>
                      {pkg.bonus && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#E2EFE0] border border-[#1D1D1D]">
                          {pkg.bonus}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-[#1D1D1D]/80 mt-1">{pkg.price}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-[#1D1D1D] uppercase tracking-wider">
              Step 3: Select Payment Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'qris', name: 'QRIS / E-Wallet' },
                { id: 'card', name: 'Credit Card' },
                { id: 'bank', name: 'Bank Transfer' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedPayment(m.id)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border border-[#1D1D1D] transition-all cursor-pointer ${
                    selectedPayment === m.id
                      ? 'bg-[#A8C88A] shadow-[1.5px_1.5px_0px_#1D1D1D]'
                      : 'bg-white hover:bg-[#F8F7F3]'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Checkout Footer Action */}
          <div className="pt-3 border-t border-[#D8D8D8] flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Payment:</p>
              <p className="text-xl font-black text-[#1D1D1D]">{selectedPkg.price}</p>
            </div>
            <Button variant="dark" type="submit" size="lg" className="px-8">
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
          </div>
        </form>
      )}

      {/* Player ID Guide Modal */}
      <PlayerIdGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        gameName={game.name}
      />
    </Dialog>
  );
};

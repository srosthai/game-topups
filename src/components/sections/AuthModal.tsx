import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { LogIn, UserPlus, Gamepad2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${mode === 'login' ? 'Logged in' : 'Account created'} successfully!`);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? 'Welcome Back!' : 'Create Gamer Account'}
      description={mode === 'login' ? 'Sign in to access your topup history and saved games.' : 'Join Topup Gems for instant bonuses and rewards.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#1D1D1D] uppercase">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. ProGamer99"
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#1D1D1D] rounded-xl shadow-[1.5px_1.5px_0px_#1D1D1D] focus:outline-none focus:ring-2 focus:ring-[#A8C88A]"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#1D1D1D] uppercase">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="gamer@example.com"
            className="w-full px-3.5 py-2 text-sm bg-white border border-[#1D1D1D] rounded-xl shadow-[1.5px_1.5px_0px_#1D1D1D] focus:outline-none focus:ring-2 focus:ring-[#A8C88A]"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#1D1D1D] uppercase">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2 text-sm bg-white border border-[#1D1D1D] rounded-xl shadow-[1.5px_1.5px_0px_#1D1D1D] focus:outline-none focus:ring-2 focus:ring-[#A8C88A]"
          />
        </div>

        <div className="pt-2">
          <Button variant="primary" fullWidth type="submit" size="lg">
            {mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4 mr-2" /> Log In
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" /> Sign Up
              </>
            )}
          </Button>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-xs font-bold text-[#1D1D1D] underline hover:text-[#A8C88A]"
          >
            {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

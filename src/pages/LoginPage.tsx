import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ScanFace, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useLanguage } from '../contexts/LanguageContext';
export function LoginPage() {
  const navigate = useNavigate();
  const {
    t,
    toggleLanguage,
    language
  } = useLanguage();
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleBiometricLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  return <div className="min-h-screen relative flex flex-col p-4 overflow-hidden" style={{
    backgroundColor: '#0d79bd'
  }}>
      {/* Digital Background Effects */}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d79bd] via-[#0a5a8f] to-[#073d61]"></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      animation: 'gridMove 20s linear infinite'
    }}></div>

      {/* Binary code rain effect */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-[10%] text-cyan-300 text-xs font-mono animate-binary-fall" style={{
        animationDelay: '0s'
      }}>
          01001001
          <br />
          10110010
          <br />
          11010101
          <br />
          00101110
          <br />
          10011100
        </div>
        <div className="absolute top-0 left-[30%] text-cyan-300 text-xs font-mono animate-binary-fall" style={{
        animationDelay: '2s'
      }}>
          11001010
          <br />
          01010111
          <br />
          10101100
          <br />
          11100011
          <br />
          01011001
        </div>
        <div className="absolute top-0 left-[50%] text-cyan-300 text-xs font-mono animate-binary-fall" style={{
        animationDelay: '4s'
      }}>
          10110101
          <br />
          01101001
          <br />
          11010010
          <br />
          00111011
          <br />
          10100110
        </div>
        <div className="absolute top-0 left-[70%] text-cyan-300 text-xs font-mono animate-binary-fall" style={{
        animationDelay: '1s'
      }}>
          01110010
          <br />
          10011101
          <br />
          11000110
          <br />
          01010011
          <br />
          10101111
        </div>
        <div className="absolute top-0 left-[90%] text-cyan-300 text-xs font-mono animate-binary-fall" style={{
        animationDelay: '3s'
      }}>
          11010110
          <br />
          00101101
          <br />
          10110011
          <br />
          01111000
          <br />
          11001001
        </div>
      </div>

      {/* Circuit board lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" style={{
      zIndex: 1
    }}>
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="3.5s" repeatCount="indefinite" />
        </line>
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="3.8s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* Glowing particles */}
      <div className="absolute inset-0" style={{
      zIndex: 2
    }}>
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
        <div className="absolute top-[40%] right-[20%] w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50 animate-pulse" style={{
        animationDelay: '0.5s'
      }}></div>
        <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-[50%] right-[15%] w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50 animate-pulse" style={{
        animationDelay: '1.5s'
      }}></div>
        <div className="absolute top-[60%] left-[70%] w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse" style={{
        animationDelay: '0.8s'
      }}></div>
      </div>

      {/* Floating tech elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-cyan-400/20 rounded-lg animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-cyan-400/20 rounded-lg animate-float" style={{
      animationDelay: '1s'
    }}></div>

      {/* Language Toggle */}
      <button onClick={toggleLanguage} className="absolute top-4 right-4 p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-colors shadow-lg min-w-[44px] min-h-[44px] z-20">
        <Globe className="w-5 h-5 text-white" />
      </button>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full"></div>
              <img src="/Asset_2008112025.png" alt="Biomark" className="w-48 h-auto mx-auto relative drop-shadow-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-poppins drop-shadow-lg">
              {t('welcomeBack') || 'Welcome Back'}
            </h1>
            <p className="text-cyan-100 text-sm">
              {t('loginToContinue') || 'Sign in to continue to your account'}
            </p>
          </div>

          {/* Login Card with Glassmorphism */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20">
            {/* Face ID Login */}
            <div className="text-center pb-6 border-b border-white/20">
              <button onClick={handleBiometricLogin} disabled={loading} className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50">
                <ScanFace className="w-12 h-12 text-white" />
              </button>
              <p className="mt-4 text-sm text-white/90 font-medium">
                {t('biometricLogin') || 'Face ID to login'}
              </p>
            </div>

            {/* Staff ID/Password Form */}
            <form onSubmit={handleStaffLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Staff ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input type="text" value={staffId} onChange={e => setStaffId(e.target.value)} placeholder="EMP-12345" className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all min-h-[44px] backdrop-blur-sm" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  {t('password') || 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all min-h-[44px] backdrop-blur-sm" required />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 text-cyan-400 border-white/30 rounded focus:ring-cyan-400 bg-white/10" />
                  <label htmlFor="remember" className="ml-2 text-sm text-white/90">
                    {t('rememberMe') || 'Remember me'}
                  </label>
                </div>
                <button type="button" className="text-sm text-cyan-300 hover:text-cyan-200 font-medium">
                  {t('forgotPassword') || 'Forgot?'}
                </button>
              </div>

              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:from-cyan-500 hover:to-cyan-700 transition-all duration-200 min-h-[44px] disabled:opacity-50">
                {loading ? <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </span> : t('login') || 'Sign In'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-white/60 text-xs">
            © 2024 BIOMARK. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes binary-fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        .animate-binary-fall {
          animation: binary-fall 15s linear infinite;
        }
      `}</style>
    </div>;
}
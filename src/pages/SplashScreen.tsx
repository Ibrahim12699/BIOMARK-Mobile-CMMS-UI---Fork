import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{
    backgroundColor: '#0d79bd'
  }}>
      {/* Gradient overlay matching login screen */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d79bd] via-[#0a5a8f] to-[#073d61]"></div>

      {/* Circuit Board Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
        backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
        backgroundSize: '50px 50px'
      }}></div>
      </div>

      {/* Animated Circuit Traces */}
      <svg className="absolute inset-0 w-full h-full" style={{
      zIndex: 1
    }}>
        {/* Horizontal traces */}
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="2" className="animate-pulse">
          <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="2" className="animate-pulse">
          <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
        </line>

        {/* Vertical traces */}
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2.8s" repeatCount="indefinite" />
        </line>

        {/* Diagonal traces */}
        <line x1="0" y1="0" x2="30%" y2="30%" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.2;0.7;0.2" dur="2.2s" repeatCount="indefinite" />
        </line>
        <line x1="100%" y1="0" x2="70%" y2="30%" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.2;0.7;0.2" dur="2.6s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* Circuit Nodes (Connection Points) */}
      <div className="absolute inset-0" style={{
      zIndex: 2
    }}>
        {/* Top nodes */}
        <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
        <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50 animate-pulse" style={{
        animationDelay: '0.5s'
      }}></div>

        {/* Middle nodes */}
        <div className="absolute top-[50%] left-[20%] w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-[50%] right-[20%] w-3 h-3 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50 animate-pulse" style={{
        animationDelay: '1.5s'
      }}></div>

        {/* Bottom nodes */}
        <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse" style={{
        animationDelay: '0.8s'
      }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-3 h-3 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50 animate-pulse" style={{
        animationDelay: '1.2s'
      }}></div>

        {/* Corner nodes */}
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-cyan-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-[10%] right-[5%] w-2 h-2 bg-cyan-300/60 rounded-full animate-ping" style={{
        animationDelay: '0.3s'
      }}></div>
        <div className="absolute bottom-[10%] left-[5%] w-2 h-2 bg-cyan-300/60 rounded-full animate-ping" style={{
        animationDelay: '0.6s'
      }}></div>
        <div className="absolute bottom-[10%] right-[5%] w-2 h-2 bg-cyan-400/60 rounded-full animate-ping" style={{
        animationDelay: '0.9s'
      }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Electronic Board Frame for Logo */}
        <div className="relative mb-8">
          {/* Glowing circuit board frame */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 blur-2xl rounded-3xl scale-110 animate-pulse-slow"></div>

          {/* PCB-style container */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-cyan-400/30 shadow-2xl">
            {/* Corner circuit details */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/50"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-300/50"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-300/50"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/50"></div>

            {/* LED indicators */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
              <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse shadow-lg shadow-cyan-300/50" style={{
              animationDelay: '0.3s'
            }}></div>
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{
              animationDelay: '0.6s'
            }}></div>
            </div>

            {/* Logo */}
            <img src="/biomark_logo.png" alt="Biomark" className="w-40 h-auto mx-auto drop-shadow-2xl animate-scale-in" />

            {/* Bottom circuit trace */}
            <div className="absolute bottom-3 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          </div>
        </div>

        {/* Tagline with digital effect */}
        <div className="animate-fade-in" style={{
        animationDelay: '0.3s',
        opacity: 0,
        animationFillMode: 'forwards'
      }}>
          <h2 className="text-white text-xl font-semibold mb-2 font-poppins tracking-wider">
            BIOMARK
          </h2>
          <p className="text-cyan-200 text-sm font-light tracking-widest uppercase">
            Healthcare CMMS Platform
          </p>
        </div>

        {/* Electronic Loading Indicator */}
        <div className="mt-12 flex justify-center items-center gap-3 animate-fade-in" style={{
        animationDelay: '0.6s',
        opacity: 0,
        animationFillMode: 'forwards'
      }}>
          {/* Circuit-style loading bars */}
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-cyan-400/60 rounded-full animate-pulse"></div>
            <div className="w-1 h-6 bg-cyan-400/80 rounded-full animate-pulse" style={{
            animationDelay: '0.1s'
          }}></div>
            <div className="w-1 h-8 bg-cyan-400 rounded-full animate-pulse" style={{
            animationDelay: '0.2s'
          }}></div>
            <div className="w-1 h-6 bg-cyan-400/80 rounded-full animate-pulse" style={{
            animationDelay: '0.3s'
          }}></div>
            <div className="w-1 h-4 bg-cyan-400/60 rounded-full animate-pulse" style={{
            animationDelay: '0.4s'
          }}></div>
          </div>

          <span className="text-white/60 text-xs font-mono">
            INITIALIZING...
          </span>
        </div>

        {/* Version with circuit style */}
        <div className="mt-8 animate-fade-in" style={{
        animationDelay: '0.9s',
        opacity: 0,
        animationFillMode: 'forwards'
      }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-white/60 text-xs font-mono">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Bottom circuit board edge effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 animate-pulse"></div>
    </div>;
}
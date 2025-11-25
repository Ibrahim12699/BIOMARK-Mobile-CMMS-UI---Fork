import React, { useState } from 'react';
import { BottomNav } from './ui/BottomNav';
import { Drawer } from './ui/Drawer';
interface AppShellProps {
  children: React.ReactNode;
}
export function AppShell({
  children
}: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-navy-dark dark:via-navy dark:to-navy-dark pb-20 relative overflow-hidden">
      {/* Vertical Circuit Board Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]" style={{
      backgroundImage: `url('https://uploadthingy.s3.us-west-1.amazonaws.com/m696bqcJcDJyUEWACQJxcK/Asset_706112025.png')`,
      backgroundSize: 'auto 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat-x'
    }}></div>

      {/* Digital grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
      backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
      backgroundSize: '32px 32px'
    }}></div>

      {/* Animated floating orbs with circuit glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{
      animationDelay: '1s'
    }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-2xl animate-pulse" style={{
      animationDelay: '0.5s'
    }}></div>

      {/* Tech corner accents */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/10 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-accent/10 rounded-tr-lg"></div>

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="max-w-md mx-auto relative z-10">{children}</main>

      <BottomNav onMenuClick={() => setDrawerOpen(true)} />
    </div>;
}
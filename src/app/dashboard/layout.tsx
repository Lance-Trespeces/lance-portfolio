"use client";

import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Your background UI */}
      <div className="fixed inset-0 w-full h-full bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center opacity-60 scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-950/95 backdrop-blur-[2px]"></div>
      </div>

      {/* Display PAGE CONTENT here */}
      <div className="relative z-10 p-6">
        {children}     {/* ← THIS WAS MISSING */}
      </div>
    </div>
  );
}

'use client';
import React from 'react';
import { Promotion, Place } from '@/lib/types';

interface SponsorBannerProps {
  promotion: (Promotion & { places?: Place }) | null;
  onClose?: () => void;
}

export default function SponsorBanner({ promotion, onClose }: SponsorBannerProps) {
  if (!promotion) return null;

  return (
    <div className="absolute top-20 left-4 right-4 z-20 bg-gradient-to-r from-amber-500/25 via-slate-900/90 to-slate-900/90 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 shadow-xl max-w-md mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-bold shrink-0">
          🏷️
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
            Destacado B2B
          </span>
          <h4 className="text-sm font-bold text-white mt-1">
            {promotion.places?.title || 'Comercio Patrocinador'}
          </h4>
          <p className="text-xs text-amber-300 font-medium">
            {promotion.discount_text}
          </p>
        </div>
      </div>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 text-sm font-bold ml-2"
        >
          ✕
        </button>
      )}
    </div>
  );
}
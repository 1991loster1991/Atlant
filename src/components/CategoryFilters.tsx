'use client';
import React from 'react';
import { Category } from '@/lib/types';

interface Props {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function CategoryFilters({ categories, selectedCategory, onSelectCategory }: Props) {
  return (
    <div className="absolute bottom-6 left-4 right-4 z-20 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg transition ${
          selectedCategory === null 
            ? 'bg-amber-500 text-slate-950 font-bold' 
            : 'bg-slate-900/90 text-slate-200 border border-slate-700 backdrop-blur-md'
        }`}
      >
        🌟 Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg transition flex items-center gap-2 ${
            selectedCategory === cat.id 
              ? 'bg-amber-500 text-slate-950 font-bold' 
              : 'bg-slate-900/90 text-slate-200 border border-slate-700 backdrop-blur-md'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
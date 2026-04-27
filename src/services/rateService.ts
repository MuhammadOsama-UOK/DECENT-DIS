import { useState, useEffect } from 'react';

// To be replaced with real Firestore later
const MOCK_RATES = [
  { id: '1', itemNameEn: 'Copper', itemNameUrdu: 'تانبا', pricePerKG: 2450, trend: 'up' },
  { id: '2', itemNameEn: 'Iron', itemNameUrdu: 'لوہا', pricePerKG: 215, trend: 'down' },
  { id: '3', itemNameEn: 'Aluminum', itemNameUrdu: 'ایلومینیم', pricePerKG: 580, trend: 'up' },
];

export const rateService = {
  getRates: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_RATES;
  },
  
  updateRate: async (id: string, newPrice: number) => {
     console.log(`Updated rate ${id} to ${newPrice}`);
     return true;
  }
};

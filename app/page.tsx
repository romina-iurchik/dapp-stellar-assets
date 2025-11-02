'use client';

import { useState } from 'react';
import WalletConnect from '../src/components/WalletConnect';

export default function Home() {
  const [publicKey, setPublicKey] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-yellow-600 text-white">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-yellow-400/30 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
            Assets Nativos en Stellar
          </h1>
          <p className="text-yellow-100 mt-2">Tu dApp de stablecoins en testnet</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-center">
          <WalletConnect onConnect={setPublicKey} />
        </div>

        {publicKey && (
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-yellow-400/30 text-center shadow-lg">
            <p className="text-sm text-yellow-100">
              <strong>Wallet conectada:</strong>
            </p>
            <p className="font-mono text-lg mt-1 text-yellow-200">{publicKey}</p>
          </div>
        )}
      </div>
    </main>
  );
}

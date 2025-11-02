'use client';

import { useState, useEffect } from 'react';

interface Props {
  onConnect: (publicKey: string) => void;
}

export default function WalletConnect({ onConnect }: Props) {
  const [publicKey, setPublicKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if wallet is already connected
  useEffect(() => {
    if (!mounted) return;

    const checkConnection = async () => {
      try {
        const freighter = await import('@stellar/freighter-api');
        const connected = await freighter.isConnected();
        if (connected) {
          const result = await freighter.getAddress();
          if (result.address) {
            setPublicKey(result.address);
            onConnect(result.address);
          }
        }
      } catch (err: any) {
        console.error('Error checking connection:', err);
      }
    };

    checkConnection();
  }, [mounted, onConnect]);

  const connectWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      if (typeof window === 'undefined') throw new Error('Solo funciona en el navegador');

      const freighter = await import('@stellar/freighter-api');
      const connected = await freighter.isConnected();

      if (!connected) throw new Error('Instala Freighter desde https://freighter.app');

      const accessResult = await freighter.requestAccess();
      if (accessResult.error) throw new Error(`Acceso denegado: ${accessResult.error}`);

      const addressResult = await freighter.getAddress();
      if (addressResult.address) {
        setPublicKey(addressResult.address);
        onConnect(addressResult.address);
      } else {
        throw new Error('No se pudo obtener la dirección. Verifica que Freighter esté desbloqueado.');
      }
    } catch (err: any) {
      console.error('Error conectando wallet:', err);
      setError(err.message || 'Error al conectar');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setPublicKey('');
    onConnect('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const formatAddress = (addr: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  if (!mounted) return null;

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-yellow-500/40 w-full max-w-md text-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">
        Conectar Wallet
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/80 border border-red-500 rounded text-sm text-red-200 text-center">
          {error}
        </div>
      )}

      {!publicKey ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-green-600 text-white font-bold rounded-lg hover:from-yellow-400 hover:to-green-500 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Conectando...
            </>
          ) : (
            'Conectar Freighter'
          )}
        </button>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg border border-yellow-500/30 shadow-inner">
          <p className="text-yellow-300 font-bold text-center mb-2">
            ✅ Wallet Conectada
          </p>

          <div className="flex items-center justify-between bg-green-900/70 px-3 py-2 rounded border border-yellow-400/40 mb-3">
            <p className="text-sm font-mono break-all text-yellow-200">
              {formatAddress(publicKey)}
            </p>
            <button
              onClick={copyToClipboard}
              className="ml-2 px-3 py-1 text-xs bg-gradient-to-r from-yellow-500 to-green-600 text-white rounded hover:from-yellow-400 hover:to-green-500 transition shadow-sm"
            >
              Copiar
            </button>
          </div>

          {copied && (
            <div className="mb-3 p-2 bg-yellow-500/90 text-black text-center rounded animate-fade-in-out text-sm">
              ¡Copiado al portapapeles!
            </div>
          )}

          <button
            onClick={disconnectWallet}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition shadow-md"
          >
            Desconectar
          </button>
        </div>
      )}
    </div>
  );
}

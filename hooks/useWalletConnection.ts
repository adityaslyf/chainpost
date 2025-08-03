import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { saveWalletAddress, User } from '../lib/wallet-utils';

export function useWalletConnection() {
  const { publicKey, connected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleWalletConnection() {
      if (connected && publicKey) {
        setLoading(true);
        setError(null);
        
        try {
          const walletAddress = publicKey.toString();
          
          // Save wallet address to Supabase
          const { data, error } = await saveWalletAddress(walletAddress);
          
          if (error) {
            setError('Failed to save wallet address');
            console.error('Error saving wallet:', error);
          } else {
            setUser(data);
            console.log('Wallet connected and saved:', walletAddress);
          }
        } catch (err) {
          setError('An unexpected error occurred');
          console.error('Unexpected error:', err);
        } finally {
          setLoading(false);
        }
      } else {
        // Reset user data when wallet disconnects
        setUser(null);
        setError(null);
      }
    }

    handleWalletConnection();
  }, [connected, publicKey]);

  return {
    user,
    loading,
    error,
    walletAddress: publicKey?.toString() || null,
    connected
  };
}

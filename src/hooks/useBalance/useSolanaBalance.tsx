import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'

import type { TUseBalanceOptions } from './types'
import { isSolWallet } from '@/utils/wallet'

const SECONDS_BEFORE_NEXT_UPDATE = 2

function useSolanaBalance(options: TUseBalanceOptions) {
  const { address, isConnected, connection } = options

  const [balance, setBalance] = useState<string | null>(null)
  const isSubscriptionIsAvailable = isSolWallet(options) && address && isConnected && connection

  useEffect(() => {
    const intervalId
      = isSubscriptionIsAvailable
      && setInterval(async () => {
        const solBalance = await connection.getBalance(new PublicKey(address), 'confirmed')

        setBalance(String(solBalance))
      }, SECONDS_BEFORE_NEXT_UPDATE * 1000)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isSubscriptionIsAvailable, connection, address, setBalance])

  return balance
}

export { useSolanaBalance }

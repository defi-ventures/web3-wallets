import { createContext } from 'react'
import { WALLET_NAMES } from '..'

import type { TWallet, TWalletState, TWalletStore } from '../types'
import { WalletStatusEnum } from '../types'

const INITIAL_STATE: TWalletStore = {
  status: WalletStatusEnum.NOT_INITED,
  isConnected: false, // TODO: Remove (use status)
  name: null,
  subName: null,
  chainId: null,
  address: '',
  addressShort: '',
  addressDomain: null,
  balance: null,
  connection: null,
  provider: null,
  walletProvider: null,
  connectedWallets: []
}

const INITIAL_WALLET_STATE = Object.values(WALLET_NAMES).reduce((acc, walletName) => ({ ...acc, [walletName]: INITIAL_STATE }), {} as TWalletState)

const WalletContext = createContext<TWallet>({
  ...INITIAL_STATE,
  walletAddressesHistory: {},
  walletState: INITIAL_WALLET_STATE,
  restore: () => Promise.reject(),
  connect: () => Promise.reject(),
  changeNetwork: () => Promise.reject(),
  sendTx: () => Promise.reject(),
  disconnect: () => {},
  estimateGas: () => Promise.reject(),
  waitForTransaction: () => Promise.reject(),
  getTransaction: () => Promise.reject()
})

export { WalletContext, INITIAL_STATE, INITIAL_WALLET_STATE }

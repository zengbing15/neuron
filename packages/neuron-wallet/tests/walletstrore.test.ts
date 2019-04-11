import { v4 } from 'uuid'
import assert from 'assert'
import WalletStore, { WalletData } from '../src/store/WalletStore'

describe('wallet store', () => {
  const walletStore = new WalletStore()

  const wallet1: WalletData = {
    id: v4(),
    name: 'wallet1',
    keystore: {
      version: 0,
      id: '0',
      crypto: {
        cipher: 'wallet1',
        cipherparams: { iv: 'walle1' },
        ciphertext: 'wallet1',
        kdf: '1',
        kdfparams: {
          dklen: 1,
          n: 1,
          r: 1,
          p: 1,
          salt: '1',
        },
        mac: '1',
      },
    },
    addresses: {
      receiving: ['address1', 'address2', 'address3'],
      change: ['address1', 'address2', 'address3'],
    },
  }

  const wallet2: WalletData = {
    id: v4(),
    name: 'wallet2',
    keystore: {
      version: 0,
      id: '1',
      crypto: {
        cipher: 'wallet2',
        cipherparams: { iv: 'walle2' },
        ciphertext: 'wallet2',
        kdf: '2',
        kdfparams: {
          dklen: 1,
          n: 1,
          r: 1,
          p: 1,
          salt: '1',
        },
        mac: '2',
      },
    },
    addresses: {
      receiving: ['address1', 'address2', 'address3'],
      change: ['address1', 'address2', 'address3'],
    },
  }
  const wallet3: WalletData = {
    id: v4(),
    name: 'wallet3',
    keystore: {
      version: 0,
      id: '1',
      crypto: {
        cipher: 'wallet3',
        cipherparams: { iv: 'walle1' },
        ciphertext: 'wallet3',
        kdf: '3',
        kdfparams: {
          dklen: 1,
          n: 1,
          r: 1,
          p: 1,
          salt: '1',
        },
        mac: '3',
      },
    },
    addresses: {
      receiving: ['address1', 'address2', 'address3'],
      change: ['address1', 'address2', 'address3'],
    },
  }

  beforeEach(() => {
    walletStore.clearAll()
  })

  it('save wallet', () => {
    walletStore.saveWallet(wallet1)
    const wallet = walletStore.getWallet(wallet1.id)
    assert.deepEqual(wallet, wallet1)
  })

  it('get not exist wallet', () => {
    walletStore.saveWallet(wallet1)
    try {
      walletStore.getWallet('1111111111')
    } catch (e) {
      assert.deepEqual(e, 0)
    }
  })

  it('get all wallets', () => {
    walletStore.saveWallet(wallet1)
    walletStore.saveWallet(wallet2)
    walletStore.saveWallet(wallet3)
    const wallets = walletStore.getAllWallets()
    assert.deepEqual(wallets, [wallet1, wallet2, wallet3])
  })

  it('rename wallet', () => {
    walletStore.saveWallet(wallet1)
    walletStore.saveWallet(wallet2)
    walletStore.renameWallet(wallet1.id, wallet2.name)
    const wallet = walletStore.getWallet(wallet1.id)
    assert.deepEqual(wallet, {
      id: wallet1.id,
      name: wallet2.name,
      keystore: wallet1.keystore,
      addresses: wallet1.addresses,
    })
  })

  it('update addresses', () => {
    walletStore.saveWallet(wallet1)
    const addresses = {
      receiving: ['address1', 'address2', 'address3'],
      change: ['address1', 'address2', 'address3'],
    }
    walletStore.updateAddresses(wallet1.id, addresses)
    const wallet = walletStore.getWallet(wallet1.id)
    assert.deepEqual(wallet, {
      id: wallet1.id,
      name: wallet1.name,
      keystore: wallet1.keystore,
      addresses,
    })
  })

  it('delete wallet', () => {
    walletStore.saveWallet(wallet1)
    walletStore.saveWallet(wallet2)
    walletStore.deleteWallet(wallet1.id)
    try {
      walletStore.getWallet(wallet1.id)
    } catch (e) {
      assert.deepEqual(e, 0)
    }
  })
})
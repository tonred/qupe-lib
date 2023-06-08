import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider'
import { type FullContractState } from 'everscale-inpage-provider/dist/models'

import { now } from './utils'

type AccountStateResponse = FullContractState | undefined

export class AccountsStore {

    private cache: Map<Address, [number, AccountStateResponse]>

    constructor(
        private rpc: ProviderRpcClient,
    ) {
        this.cache = new Map<Address, [number, AccountStateResponse]>()
    }

    async getAccountState(address: Address, ttl: number = 0): Promise<AccountStateResponse> {
        if (ttl > 0) {
            const [time, state] = await this.getStoredOrDownload(address)
            if (time + ttl * 1000 >= now()) {
                return state
            }
            return this.downloadState(address)

        }
        if (ttl === 0) {
            return this.downloadState(address)
        }
        return (await this.getStoredOrDownload(address))[1]

    }

    private async downloadState(address: Address): Promise<AccountStateResponse> {
        const { state } = await this.rpc.getFullContractState({ address })
        console.log(`Loaded new state: ${address.toString()}`)
        this.cache.set(address, [now(), state])
        return state
    }

    private async getStoredOrDownload(address: Address): Promise<[number, AccountStateResponse]> {
        const stored = this.cache.get(address)
        if (stored) {
            console.log(`Cache hit: ${address.toString()}`)
            return stored
        }
        const state = await this.downloadState(address)
        return [now(), state]
    }

    setAccountState(address: Address, state: AccountStateResponse): void {
        this.cache.set(address, [now(), state])
    }

    purgeAll(): void {
        this.cache = new Map<Address, [number, AccountStateResponse]>()
    }

    purge(address: Address): void {
        this.cache.delete(address)
    }

    purgeOld(ttl: number): void {
        this.cache.forEach((value, key, map) => {
            if (value[0] + ttl * 1000 < now()) {
                map.delete(key)
            }
        })

    }

}

let _accountStore: AccountsStore | undefined
export const accountStore = (rpc: ProviderRpcClient): AccountsStore => {
    if (!_accountStore) {
        _accountStore = new AccountsStore(rpc)
    }
    return _accountStore
}

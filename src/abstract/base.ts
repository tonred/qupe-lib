import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider'
import { type FullContractState } from 'everscale-inpage-provider/dist/models'

import { accountStore } from '../cache'


export abstract class Base<Abi> {

    balance: string = '0'

    isDeployed: boolean = false

    protected isListening: boolean = false

    protected constructor(
        protected readonly rpc: ProviderRpcClient,
        protected readonly abi: Abi,
        readonly address: Address,
        readonly contract = new rpc.Contract(abi, address),
        protected readonly _accountStore = accountStore(rpc),
    ) {
    }

    abstract parseData(): Promise<void>

    async init(): Promise<void> {
        const state = await this.getState()
        if (!state) return
        this.balance = state.balance
        this.isDeployed = state.isDeployed
        await this.parseData()
    }

    async getState(force: boolean = false): Promise<FullContractState | undefined> {
        if (force) {
            return this._accountStore.getAccountState(this.address, 0)
        }
        if (this.isListening) {
            return this._accountStore.getAccountState(this.address, -1)
        }
        return this._accountStore.getAccountState(this.address, this.stateTtl)
    }

    protected abstract get stateTtl(): number

}

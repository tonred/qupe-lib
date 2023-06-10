import { zeroAddress } from './utils'

export const CHAT_MESSAGE_VERSION = 1
export const MessageValues = {
    Profile: {
        BanUser: 1_000_000_000,
        Proxy: 1_000_000_000,
        UpdateDefaultPermissions: 1_000_000_000,
        UpdateMeta: 500_000_000,
        UpdateRoomInfo: 1_000_000_000,
        UpdateServerInfo: 1_000_000_000,
        UpdateUserPermissions: 1_000_000_000,
        Withdraw: 500_000_000,
    },
    Root: {
        DeployProfile: 1_000_000_000,
        DeployServer: 2_000_000_000,
    },
    Server: {
        CreateRoom: 2_000_000_000,
        Join: 500_000_000,
    },
}

export const EMPTY_PAYMENT = {
    amount: 0,
    token: zeroAddress,
}

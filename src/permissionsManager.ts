import { type Address } from 'everscale-inpage-provider'

import { type ProfileType } from './abstract/types'
import { type UserPermissions } from './permissions'

export interface Permissioned {
    address: Address
    defaultPermissions: UserPermissions
}
export type input = {entity: Permissioned, profile: ProfileType}
class Manager {

    static canSendMessage(input: input): boolean {
        const userRecords = Manager.getCustomRecord(input)
        if (userRecords) {
            return userRecords.canSendMessage
        }
        return input.entity.defaultPermissions.canSendMessage
    }

    static canCreateRoom(input: input): boolean {
        const userRecords = Manager.getCustomRecord(input)
        if (userRecords) {
            return userRecords.canCreateRoom
        }
        return input.entity.defaultPermissions.canCreateRoom
    }

    static canChangeConfig(input: input): boolean {
        const userRecords = Manager.getCustomRecord(input)
        if (userRecords) {
            return userRecords.canChangeConfig
        }
        return input.entity.defaultPermissions.canChangeConfig
    }

    static isAdmin(input: input): boolean {
        const userRecords = Manager.getCustomRecord(input)
        if (userRecords) {
            return userRecords.isAdmin
        }
        return input.entity.defaultPermissions.isAdmin
    }

    static canBan(input: input): boolean {
        const userRecords = Manager.getCustomRecord(input)
        if (userRecords) {
            return userRecords.isAdmin
        }
        return input.entity.defaultPermissions.canBan
    }

    static getCustomRecord(input: input): UserPermissions | undefined {
        return input.profile.permissions.get(input.entity.address.toString())
    }

}

export const PermissionsManager = Manager

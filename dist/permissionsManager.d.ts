import { type Address } from 'everscale-inpage-provider';
import { type ProfileType } from './abstract/types';
import { type UserPermissions } from './permissions';
export interface Permissioned {
    address: Address;
    defaultPermissions: UserPermissions;
}
export type input = {
    entity: Permissioned;
    profile: ProfileType;
};
declare class Manager {
    static canSendMessage(input: input): boolean;
    static canCreateRoom(input: input): boolean;
    static canChangeConfig(input: input): boolean;
    static isAdmin(input: input): boolean;
    static canBan(input: input): boolean;
    static getCustomRecord(input: input): UserPermissions | undefined;
}
export declare const PermissionsManager: typeof Manager;
export {};

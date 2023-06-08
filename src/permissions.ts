/* eslint-disable max-classes-per-file */
export enum PermissionsType {
    ADMIN,
    CONFIG,
    BAN_UNBAN,
    CREATE_ROOM,
    SEND_MESSAGE
}

export class UserPermissions {

    constructor(
        protected _values: boolean[] = [false, false, false, false, false],
    ) {
    }

    get values(): boolean[] {
        return this._values
    }

    set isAdmin(value: boolean) {
        this._values[PermissionsType.ADMIN] = value
    }

    get isAdmin(): boolean {
        return this._values[PermissionsType.ADMIN]
    }

    set canChangeConfig(value: boolean) {
        this._values[PermissionsType.CONFIG] = value
    }

    get canChangeConfig(): boolean {
        return this._values[PermissionsType.CONFIG]
    }

    set canBan(value: boolean) {
        this._values[PermissionsType.BAN_UNBAN] = value
    }

    get canBan(): boolean {
        return this._values[PermissionsType.BAN_UNBAN]
    }

    set canCreateRoom(value: boolean) {
        this._values[PermissionsType.CREATE_ROOM] = value
    }

    get canCreateRoom(): boolean {
        return this._values[PermissionsType.CREATE_ROOM]
    }

    set canSendMessage(value: boolean) {
        this._values[PermissionsType.SEND_MESSAGE] = value
    }


    get canSendMessage(): boolean {
        return this._values[PermissionsType.SEND_MESSAGE]
    }

}

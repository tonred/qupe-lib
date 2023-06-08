import { type ProfileType, type RoomType, type ServerType } from './types'
import { Base } from './base'

export abstract class Message<
    // @ts-ignore
    // eslint-disable-next-line unused-imports/no-unused-vars-ts
    S extends ServerType,
    P extends ProfileType,
    R extends RoomType,
    Abi
> extends Base<Abi> {

    // react
    // delete
    // edit


    abstract isDeleted(): boolean

    abstract getRoom(): R

    abstract getSender(): P

}

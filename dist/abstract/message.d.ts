import { type ProfileType, type RoomType, type ServerType } from './types';
import { Base } from './base';
export declare abstract class Message<S extends ServerType, P extends ProfileType, R extends RoomType, Abi> extends Base<Abi> {
    abstract isDeleted(): boolean;
    abstract getRoom(): R;
    abstract getSender(): P;
}

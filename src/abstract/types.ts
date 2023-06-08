import { type Root } from './root'
import { type Server } from './server'
import { type Room } from './room'
import { type Profile } from './profile'
import { type Message } from './message'

export type RootType = Root<any, any, any, any, any>
export type ServerType = Server<any, any, any, any, any>
export type RoomType = Room<any, any, any, any, any>
export type ProfileType = Profile<any, any, any>
export type MessageType = Message<any, any, any, any>

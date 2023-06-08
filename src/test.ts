// import { Address, ProviderRpcClient } from 'everscale-inpage-provider'
// // import { EverscaleStandaloneClient } from 'everscale-standalone-client'
// import { EverscaleStandaloneClient } from 'everscale-standalone-client/nodejs'
//
// import { ChatRoot } from './chat'
//
//
// // eslint-disable-next-line unused-imports/no-unused-vars-ts
// // async function testStateStore(rpc: ProviderRpcClient): Promise<void> {
// //     const cache = new AccountsStore(rpc)
// //     const a = new Address('-1:3333333333333333333333333333333333333333333333333333333333333333')
// //     console.log((await cache.getAccountState(a))?.genTimings)
// //     console.log((await cache.getAccountState(a, 1))?.genTimings)
// //     // eslint-disable-next-line no-promise-executor-return
// //     await new Promise(r => setTimeout(r, 2000))
// //     console.log((await cache.getAccountState(a, 1))?.genTimings)
// //     // eslint-disable-next-line no-promise-executor-return
// //     await new Promise(r => setTimeout(r, 2000))
// //     console.log((await cache.getAccountState(a, -1))?.genTimings)
// // }
//
// async function main(): Promise<void> {
//     // const m = new Main()
//     // let r = m.serverImplRegistry
//     //
//     // r.register('Chat', ChatServer)
//     //
//     // // @ts-ignore
//     // const S: typeof ChatServer = m.serverImplRegistry.get('Chat')
//     // new S()
//
//     const rpc = new ProviderRpcClient({
//         fallback: () => EverscaleStandaloneClient.create({
//             // connection: 'mainnetJrpc',
//             connection: {
//                 data: {
//                     endpoints: ['https://net.ton.red/graphql'],
//                     latencyDetectionInterval: 1000,
//                     local: true,
//                 },
//                 group: 'localnet',
//                 id: 1,
//                 type: 'graphql',
//             },
//         }),
//         forceUseFallback: true,
//     })
//     // await testStateStore(rpc)
//
//     const rootAddr = new Address('0:d8f519f9cd186a66d1afec6e0c9ef22f7429721e7f990c46aa22d6480c9b5998')
//     const root = new ChatRoot(rpc, rootAddr)
//     const p = await root.getProfile(new Address('0:b71457a33f453a9257ce2379127dc74f18a6e95f3be3abe778eb52fe1a909203'))
//     console.log(await p.contract.getFields())
//     // const chatServer = (await root.getServer(0))!
//     // console.log(chatServer.info()?.meta)
//     // const room = await chatServer.getRoomById(0)
//     // console.log(room.info()?.meta)
//     // await room.getMessages(10)
//     // console.log(123)
//     // await room.getMessages(10)
//
//     // console.log(await root.expectedServerAddress(0))
//     // console.log(await root.expectedServerAddress(0))
//     // console.log(await root.expectedRoomAddress(0, 0))
//     // const s = new ChatServer(rpc, new Address('0:aa51f4fb9a83f25108d7c191a31f5a18991bda1a98fb6e42f5801607b2f7383c'))
//     // const { boc: initData } = await rpc.packIntoCell({
//     //     data: { serverID: 0 },
//     //     structure: [
//     //         { name: 'serverID', type: 'uint64' },
//     //     ] as const,
//     // })
//     // // await s.init()
//     // console.log(await s.expectedPlatformAddr(rootAddr, rootAddr, PlatformType.SERVER, initData))
//     // console.log(s.baseData)
//     // console.log(s.chatData?.info)
//     // s.createRoom()
// }
//
//
// main().then(() => {
//     process.exit(0)
// })
// //
// // export enum MessageAttachmentType {
// //     IMAGE,
// //     AUDIO,
// //     VIDEO,
// //     FILE,
// // }
// //
// // console.log(Object.values(MessageAttachmentType))
// // console.log([MessageAttachmentType.AUDIO])


const aasd = new Map<number, string>([[0, '1'], [2, '2']])
console.log([...aasd.keys()])

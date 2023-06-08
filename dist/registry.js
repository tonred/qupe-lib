"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export class ImplementationRegistry<T extends object, C> {
//
//     private constructor(private registry: T) {
//     }
//
//     register<K extends string, S extends C>(key: K, implementation: S): ImplementationRegistry<Record<K, S> & T, C> {
//         (this.registry as any)[key] = implementation
//         return this as any as ImplementationRegistry<Record<K, S> & T, C>
//     }
//
//     get<K extends keyof T>(key: K): T[K] {
//         if (!(key in this.registry)) {
//             throw new Error(`Invalid type${String(key)}`)
//         }
//         return this.registry[key]
//     }
//
//     static init<C>(): ImplementationRegistry<{}, C> {
//         return new ImplementationRegistry<{}, C>({})
//     }
//
// }

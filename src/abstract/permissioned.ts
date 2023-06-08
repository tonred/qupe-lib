import { UserPermissions } from '../permissions'

export abstract class Permissioned {

    defaultPermissions = new UserPermissions()

}

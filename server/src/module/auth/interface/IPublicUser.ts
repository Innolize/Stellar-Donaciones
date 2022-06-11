import { IUserCreate } from '../../user/interface/IUserCreate'

export type IPublicUser = Pick<IUserCreate, "email" | "kPublic" | "id">;

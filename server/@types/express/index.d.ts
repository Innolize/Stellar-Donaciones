import { IPublicUser } from "../../src/module/auth/interface/IPublicUser";

declare global {
  namespace Express {
    interface Request {
      user?: IPublicUser;
    }
  }
}
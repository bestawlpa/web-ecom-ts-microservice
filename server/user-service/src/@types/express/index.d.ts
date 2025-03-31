import { IUser } from "../../model/userModel";

declare module 'express' {
  export interface Request {
    user?: IUser;  
  }
}
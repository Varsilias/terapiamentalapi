import { Request } from "express";

export interface IRequest extends Request {
  [props: string]: any;
}

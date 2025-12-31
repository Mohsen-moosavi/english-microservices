import { AxiosRequestConfig } from "axios";
import { AuthRequest } from "./request";

export interface GatewayAxiosConfig extends AxiosRequestConfig {
  metadata?: {
    user?: AuthRequest["user"];
  };
}
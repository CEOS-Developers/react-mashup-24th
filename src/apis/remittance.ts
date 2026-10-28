import { get, post } from "./client";
import type {
  CreateRemittanceRequest,
  LatestRemittance,
  Remittance,
} from "../types/remittance";

export const createRemittance = (body: CreateRemittanceRequest) =>
  post<Remittance, CreateRemittanceRequest>("/v1/remittances", body);

export const getLatestRemittance = (signal?: AbortSignal) =>
  get<LatestRemittance>("/v1/remittances/latest", { signal });

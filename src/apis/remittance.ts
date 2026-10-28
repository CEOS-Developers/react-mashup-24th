import { post } from "./client";
import type { CreateRemittanceRequest, Remittance } from "../types/remittance";

export const createRemittance = (body: CreateRemittanceRequest) =>
  post<Remittance, CreateRemittanceRequest>("/v1/remittances", body);

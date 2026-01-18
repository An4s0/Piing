import type { IOtp } from "@/types";
import { BaseService } from "./base";

class OtpsService extends BaseService<IOtp> {
  constructor() {
    super("otps");
  }
}

export const otpsService = new OtpsService();

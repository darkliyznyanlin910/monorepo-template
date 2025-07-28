import {
  KUBERNETES_INTERNAL_SERVICE_MAP,
  LOCAL_SERVICE_MAP,
  PRODUCTION_SERVICE_MAP,
  SERVICE_CONFIG,
} from "./config";
import { env } from "./env";
import { Service } from "./types";

export const SERVICES = Object.keys(
  SERVICE_CONFIG,
) as (keyof typeof SERVICE_CONFIG)[];

export function getTrustedOrigins() {
  return SERVICES.filter((service) => SERVICE_CONFIG[service].exposed).map(
    (service) => getBaseUrl(service),
  );
}

export function getBaseUrl(service: Service, internal = false) {
  if (env.NODE_ENV === "development") {
    return LOCAL_SERVICE_MAP[service];
  } else {
    if (internal) {
      return KUBERNETES_INTERNAL_SERVICE_MAP[service];
    } else {
      return PRODUCTION_SERVICE_MAP[service];
    }
  }
}

import {
  KAFKA_CONFIG,
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

export function getTrustedOrigins(ENV: typeof env.NODE_ENV) {
  return SERVICES.filter((service) => SERVICE_CONFIG[service].exposed).map(
    (service) => getBaseUrl(ENV, service),
  );
}

export function getBaseUrl(
  ENV: typeof env.NODE_ENV,
  service: Service,
  internal = false,
) {
  if (ENV === "development") {
    return LOCAL_SERVICE_MAP[service];
  } else {
    if (internal) {
      return KUBERNETES_INTERNAL_SERVICE_MAP[service];
    } else {
      return PRODUCTION_SERVICE_MAP[service];
    }
  }
}

export function getKafkaConfig(ENV: typeof env.NODE_ENV) {
  if (ENV === "production") {
    return KAFKA_CONFIG.production;
  } else if (process.env.KUBERNETES_SERVICE_HOST) {
    // Running inside Kubernetes
    return KAFKA_CONFIG.kubernetes;
  } else {
    // Local development - requires port forward
    return KAFKA_CONFIG.local;
  }
}

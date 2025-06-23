import { env } from "~/env";

export const SERVICES = ["auth"] as const;

export type Service = (typeof SERVICES)[number];

export type ServiceMap = Record<Service, string>;

const LOCAL_SERVICE_MAP: ServiceMap = {
  auth: "http://localhost:3000",
};

const KUBERNETES_INTERNAL_SERVICE_MAP: ServiceMap = {
  auth: "http://auth-service.default.svc.cluster.local",
};

const PRODUCTION_SERVICE_MAP: ServiceMap = {
  auth: "https://auth.turbo.t3.gg",
};

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

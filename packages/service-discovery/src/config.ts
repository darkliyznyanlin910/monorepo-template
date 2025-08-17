import { ServiceMap } from "./types";

export const PROD_DOMAIN = "jknl.dev";

export const SERVICE_CONFIG = {
  auth: {
    exposed: true,
  },
} as const;

export const LOCAL_SERVICE_MAP: ServiceMap = {
  auth: "http://auth.127.0.0.1.nip.io",
};

export const KUBERNETES_INTERNAL_SERVICE_MAP: ServiceMap = {
  auth: "http://auth-service.services.svc.cluster.local",
};

export const PRODUCTION_SERVICE_MAP: ServiceMap = {
  auth: `https://auth.${PROD_DOMAIN}`,
};

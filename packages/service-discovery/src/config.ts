import { ServiceMap } from "./types";

export const SERVICE_CONFIG = {
  auth: {
    exposed: true,
  },
} as const;

export const LOCAL_SERVICE_MAP: ServiceMap = {
  auth: "http://localhost:3000",
};

export const KUBERNETES_INTERNAL_SERVICE_MAP: ServiceMap = {
  auth: "http://auth-service.default.svc.cluster.local",
};

export const PRODUCTION_SERVICE_MAP: ServiceMap = {
  auth: "https://auth.turbo.t3.gg",
};

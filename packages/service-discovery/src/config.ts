import { ServiceMap } from "./types";

export const SERVICE_CONFIG = {
  auth: {
    exposed: false,
  },
  frontend: {
    exposed: true,
  },
} as const;

export const LOCAL_SERVICE_MAP: ServiceMap = {
  auth: "http://localhost:3000",
  frontend: "http://127.0.0.1.nip.io",
};

export const KUBERNETES_INTERNAL_SERVICE_MAP: ServiceMap = {
  auth: "http://auth-service.services.svc.cluster.local",
  frontend: "http://frontend-service.services.svc.cluster.local",
};

export const PRODUCTION_SERVICE_MAP: ServiceMap = {
  auth: "https://auth.turbo.t3.gg",
  frontend: "https://frontend.turbo.t3.gg",
};

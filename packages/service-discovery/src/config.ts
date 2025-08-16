import { ServiceMap } from "./types";

export const PROD_DOMAIN = "jknl.dev";

export const SERVICE_CONFIG = {
  auth: {
    exposed: true,
  },
  analytics: {
    exposed: false,
  },
} as const;

export const LOCAL_SERVICE_MAP: ServiceMap = {
  auth: "http://auth.127.0.0.1.nip.io",
  analytics: "http://analytics.127.0.0.1.nip.io",
};

export const KAFKA_CONFIG = {
  local: {
    bootstrap: ["bootstrap.127.0.0.1.nip.io:9094"],
  },
  kubernetes: {
    bootstrap: ["kafka-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092"],
  },
  production: {
    bootstrap: ["kafka-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092"],
  },
};

export const KUBERNETES_INTERNAL_SERVICE_MAP: ServiceMap = {
  auth: "http://auth-service.services.svc.cluster.local",
  analytics: "http://analytics-service.services.svc.cluster.local",
};

export const PRODUCTION_SERVICE_MAP: ServiceMap = {
  auth: `https://auth.${PROD_DOMAIN}`,
  analytics: `https://analytics.${PROD_DOMAIN}`,
};

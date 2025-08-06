// This file is for cli generation of the auth database schema required by better-auth

import { initAuth } from "./index";

export const auth = initAuth(
  {},
  {
    baseUrl: "http://localhost:3000",
    secret: "secret",
    getOrganizations: async (userId) => {
      return [];
    },
  },
);

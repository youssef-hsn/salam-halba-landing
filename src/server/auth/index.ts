import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";
import { env } from "~/env";

type authHandlers = { GET: () => Promise<Response>; POST: () => Promise<Response> };

let auth: unknown;
let handlers: { GET: () => Promise<Response>; POST: () => Promise<Response> };
let signIn: unknown;
let signOut: unknown;

if (env.AUTH_ENABLED === "true") {
  const { auth: uncachedAuth, handlers: realHandlers, signIn: realSignIn, signOut: realSignOut } =
    NextAuth(authConfig);
  auth = cache(uncachedAuth);
  handlers = realHandlers as authHandlers;
  signIn = realSignIn;
  signOut = realSignOut;
} else {
  auth = async () => null;
  handlers = {
    GET: async () => new Response("Auth disabled", { status: 404 }),
    POST: async () => new Response("Auth disabled", { status: 404 }),
  };
  signIn = async () => {
    throw new Error("Auth disabled");
  };
  signOut = async () => {
    throw new Error("Auth disabled");
  };
}

export { auth, handlers, signIn, signOut };

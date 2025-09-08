import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { phoneNumberClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();
export const auth = betterAuth({
    appName: "Nirikshan",
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword: {
      enabled: true, 
      requireEmailVerification: true
    }, 
    emailVerification: {
        sendOnSignUp: true
    },
    socialProviders: {
        google: { 
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
    },
    advanced: {
        ipAddress: {
          ipAddressHeaders: ["cf-connecting-ip"], // Cloudflare specific header example
      },
    },
    rateLimit: {
        enabled: true,
        window: 10, // time window in seconds
        max: 100, // max requests in the window
    },
    plugins: [phoneNumberClient(), nextCookies()],
});
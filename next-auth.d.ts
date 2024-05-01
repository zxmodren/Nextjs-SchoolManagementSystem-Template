import { UserRole, UserStatus } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  status: UserStatus;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

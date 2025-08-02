import { authConfig } from "@/app/lib/authConfig";
import NextAuth from "next-auth";


// Передаем конфигурацию в NextAuth
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
export { default } from 'next-auth/middleware'
// test
export const config = {matcher: ['/profile', '/protected/:path*, /superadmin/:path*']}
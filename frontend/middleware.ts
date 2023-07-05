export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/app", "/api/tasks/:path*"],
};

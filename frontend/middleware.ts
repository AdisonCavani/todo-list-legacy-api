export { auth as middleware } from "@lib/auth";

export const config = {
  matcher: ["/app", "/api/tasks/:path*"],
  runtime: "experimental-edge",
};

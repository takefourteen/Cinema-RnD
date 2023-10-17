export { default } from "next-auth/middleware";

// Protect the /watch-tv and /watch-movie routes
export const config = {
  matcher: ["/watch-tv/:path*", "/watch-movie/:path*"],
};

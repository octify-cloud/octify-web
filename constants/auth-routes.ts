export const publicRoutes: Array<String> = ["/", "/pricing"];
export const apiRoutes: Array<string> = [];
export const authRoutes: Array<String> = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/confirm-email",
];
export const adminAuthRoutes: Array<String> = ["/admin/login"];
export const allowedWhenExpiredRoutes: Array<String> = [
  "/dashboard/invoices",
  "/dashboard/sub-ended",
  "/dashboard/points",
];

export const routesRedirects = {
  loggedin_auth_route: "/",
  not_authorized: "/",
};

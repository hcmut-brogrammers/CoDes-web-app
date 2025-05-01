export const RoutePath = {
  SignIn: () => '/sign-in',
  SignUp: () => '/sign-up',
  Dashboard: () => '/dashboard',
  Organization: () => `${RoutePath.Dashboard()}/organizations/:organizationId`,
  OrganizationInfo: () => `${RoutePath.Organization()}/info`,
  MembersInfo: () => `${RoutePath.Organization()}/members`,
};

export const AppRoute = {
  SignIn: () => '/sign-in',
  SignUp: () => '/sign-up',
  Dashboard: () => '/dashboard',
  Organization: (organizationId: string) =>
    `${AppRoute.Dashboard()}/organizations/${organizationId}`,
  OrganizationInfo: (organizationId: string) =>
    `${AppRoute.Organization(organizationId)}/info`,
  MembersInfo: (organizationId: string) =>
    `${AppRoute.Organization(organizationId)}/members`,
};

export const RoutePath = {
  SignIn: () => '/sign-in',
  SignUp: () => '/sign-up',
  Dashboard: () => '/dashboard',
  Canvas: () => `/canvas`,
  Organization: () => `${RoutePath.Dashboard()}/organizations/:organizationId`,
  OrganizationInfo: () => `${RoutePath.Organization()}/info`,
  MembersInfo: () => `${RoutePath.Organization()}/members`,
  DesignProjects: () => `${RoutePath.Organization()}/design-projects`,
};

export const AppRoute = {
  SignIn: () => '/sign-in',
  SignUp: () => '/sign-up',
  Dashboard: () => '/dashboard',
  Canvas: () => `/canvas`,
  Organization: (organizationId: string) =>
    `${AppRoute.Dashboard()}/organizations/${organizationId}`,
  OrganizationInfo: (organizationId: string) =>
    `${AppRoute.Organization(organizationId)}/info`,
  MembersInfo: (organizationId: string) =>
    `${AppRoute.Organization(organizationId)}/members`,
  DesignProjects: (organizationId: string) =>
    `${AppRoute.Organization(organizationId)}/design-projects`,
  DesignProjectCanvas: (designProjectId: string) =>
    `${AppRoute.Canvas()}?designProjectId=${designProjectId}`,
};

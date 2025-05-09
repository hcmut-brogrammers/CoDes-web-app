export const RoutePath = {
  SignIn: () => '/sign-in',
  SignUp: () => '/sign-up',
  Canvas: () => `/canvas`,
  Dashboard: () => '/dashboard',
  OrganizationInfo: () => `${RoutePath.Dashboard()}/organization/info`,
  MembersInfo: () => `${RoutePath.Dashboard()}/organization/members`,
  DesignProjects: () => `${RoutePath.Dashboard()}`,
};

export const AppRoute = {
  SignIn: () => '/sign-in',
  SignUp: () => '/sign-up',
  Canvas: () => `/canvas`,
  Dashboard: () => '/dashboard',
  OrganizationInfo: () => `${AppRoute.Dashboard()}/organization/info`,
  MembersInfo: () => `${AppRoute.Dashboard()}/organization/members`,
  DesignProjects: () => `${AppRoute.Dashboard()}`,
  DesignProjectCanvas: (designProjectId: string) =>
    `${AppRoute.Canvas()}?designProjectId=${designProjectId}`,
};

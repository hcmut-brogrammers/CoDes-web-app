export const AppRoutes = {
  SignIn: '/sign-in',
  SignUp: '/sign-up',
  Dashboard: () => '/dashboard',
  CreateOrganization: () => `${AppRoutes.Dashboard()}/create-organization`,
};

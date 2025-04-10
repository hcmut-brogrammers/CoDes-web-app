export const ApiEndpoint = {
  SignUp: '/authenticate/sign-up',
  SignIn: '/authenticate/authenticate-user',
  Organizations: '/organizations',
};

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum RequestHeader {
  ContentType = 'Content-Type',
  Authorization = 'Authorization',
}

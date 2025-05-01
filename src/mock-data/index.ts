import { MockAuthenticationData } from './auth';
import { MockOrganizationData } from './organization';

const MockData = {
  ...MockOrganizationData,
  ...MockAuthenticationData,
};

export default MockData;

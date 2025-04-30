import { v4 as uuid4 } from 'uuid';

import { IOrganization } from '@/types/organization';

export const MockOrganizationData = {
  mockOrganization: (overrides?: Partial<IOrganization>): IOrganization => ({
    id: uuid4(),
    name: 'Organization Name',
    avatar_url: 'https://example.com/avatar.png',
    owner_id: uuid4(),
    is_default: true,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }),
};

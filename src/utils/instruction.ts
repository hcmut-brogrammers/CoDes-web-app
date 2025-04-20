import { vsprintf } from 'sprintf-js';

import { Labels } from '@/assets';

export const makeCreateFirstOrganizationInstruction = (username: string) => {
  return vsprintf(Labels.Instruction.CreateFirstOrganization, [username]);
};

import { v4 as uuidv4 } from 'uuid';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomId = () => uuidv4();

export const generateRandomPrefixId = (prefix: string) =>
  `${prefix}_${uuidv4()}`;

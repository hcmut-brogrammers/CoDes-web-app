import { v4 as uuidv4 } from 'uuid';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomId = () => uuidv4();

export const generateRandomPrefixId = (prefix: string) =>
  `${prefix}_${uuidv4()}`;

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  if (size <= 0) return [];

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// current datetime
export const getCurrentDateTime = () => {
  const now = new Date();
  return now.toISOString();
};

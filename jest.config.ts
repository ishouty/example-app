import { getJestProjectsAsync } from '@nx/jest';

export default async () => {
  return {
    projects: await getJestProjectsAsync(),
    // Add the setupFilesAfterEnv property here
    setupFilesAfterEnv: ['./setup-tests.ts'],
  };
};

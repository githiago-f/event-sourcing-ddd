/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testNamePattern: [
    'tests/**.spec.ts'
  ]
};

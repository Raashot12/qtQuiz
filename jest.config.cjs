/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require( 'next/jest' );

const createJestConfig = nextJest( {
// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
} );

const esModules = [
  'wavesurfer.js',
  'wavesurfer.js/dist/plugins/',
  'react-dnd',
  'decode-uri-component',
  'split-on-first',
  'filter-obj',
];

// Add any custom config to be passed to Jest
/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/services/*.ts'],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
    },
  },
  transform: {
    'node_modules/(react-dnd|dnd-core|@react-dnd)/.+\\.(j|t)sx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    '/__fixtures__/',
    '/__utils__/',
    'mock*',
    '__tests__/utils/factories',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/state/(.*)$': '<rootDir>/components/state/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/fonts/(.*)$': '<rootDir>/fonts/$1',
    '^@/theme/(.*)$': '<rootDir>/theme/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^wavesurfer.js/dist/plugins/(.*)$':
      '<rootDir>/node_modules/wavesurfer.js/dist/plugins/$1',
    '^react-dnd$': '<rootDir>/node_modules/react-dnd/dist/',
    '^react-dnd-html5-backend$':
      '<rootDir>/node_modules/react-dnd-html5-backend/dist/',
    '^dnd-core$': '<rootDir>/node_modules/dnd-core/dist/',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => ( {
  ...( await createJestConfig( customJestConfig )() ),
  transformIgnorePatterns: esModules.length
    ? [`<rootDir>/node_modules/(?!${ esModules.join( '|' ) })`]
    : [],
} );

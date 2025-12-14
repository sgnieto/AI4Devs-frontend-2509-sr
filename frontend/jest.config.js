const path = require('path');

module.exports = {
  // Entorno de pruebas
  testEnvironment: 'jsdom',
  
  // Directorio raíz - usar path absoluto
  rootDir: path.resolve(__dirname),
  
  // Directorios donde buscar archivos
  roots: ['<rootDir>/src'],
  
  // Patrones de archivos de test
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // Extensiones de módulos
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Transformación de archivos
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        module: 'esnext',
        moduleResolution: 'node'
      },
      isolatedModules: true
    }],
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }]
  },
  
  // Mapeo de módulos (para alias de imports)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub'
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
    '!src/react-app-env.d.ts'
  ],
  
  // Ignorar patrones
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/dist/'
  ],
  
  // Configuración de módulos
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  
  // Clear mocks automáticamente
  clearMocks: true,
  
  // Restaurar mocks automáticamente
  restoreMocks: true,
  
  // Transformar módulos de node_modules que necesitan transformación
  transformIgnorePatterns: [
    'node_modules/(?!(react-bootstrap-icons|@dnd-kit)/)'
  ],
  
  // Configuración del entorno jsdom
  testEnvironmentOptions: {
    customExportConditions: ['']
  }
};


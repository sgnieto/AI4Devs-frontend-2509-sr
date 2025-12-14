// jest-dom añade matchers personalizados de jest para afirmar sobre nodos DOM
// permite hacer cosas como:
// expect(element).toHaveTextContent(/react/i)
// aprende más: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock de window.matchMedia para componentes que lo usan
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de ResizeObserver para componentes que lo usan
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));


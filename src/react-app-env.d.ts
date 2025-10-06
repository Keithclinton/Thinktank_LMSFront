// React type definitions
declare module 'react' {
  export = React;
  export as namespace React;
  namespace React {}
}

declare module 'react-dom' {
  export = ReactDOM;
  export as namespace ReactDOM;
  namespace ReactDOM {}
}

// Global type definitions for the application
export {};

declare global {
  interface Window {
    // Add any global window properties here
  }
}

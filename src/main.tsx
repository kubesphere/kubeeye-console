import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const LoadingComponent = () => (
  <div className="loading-indicator">
    <span className="loading">Loading</span>
  </div>
);

ReactDOM.render(
  <Suspense fallback={<LoadingComponent />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);

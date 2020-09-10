import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ThemeContext from './contexts/ThemeContext';

ReactDOM.render(
  <ThemeContext>
    <App />
  </ThemeContext>,
  document.getElementById('root'),
);

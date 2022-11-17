import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'; 
import { GlobalStyles } from './global-styles.js';
import { firebase } from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase.js';
import { AuthProvider } from './context/AuthProvider.js';
import App from './app';
import Favicon from "./netflix_logo_icon_170919.png";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FirebaseContext.Provider value = {{ firebase }}>
        <GlobalStyles/>
        <App> 
          <Favicon url="C:/Web development/Netflix_Clone_react/netflix/src/netflix_logo_icon_170919.png"></Favicon>
        </App>
        
      </FirebaseContext.Provider>
    </AuthProvider>
      
  </React.StrictMode>
);


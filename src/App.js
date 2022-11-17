import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home, Browse, Signin , Signup} from "./pages";
import * as ROUTES from "./constants/routes";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { UseAuthListener } from "./hooks";

//JumbotronPane is used to wrap the contents and switching them using flex-direction
function App() {
  const user = UseAuthListener();
  // console.log(user);
  
  return (

    <Router>
      <Routes>
          <Route exact path="/browse/*" element={
            <>
              <ProtectedRoute
                user={user}
                path={ROUTES.BROWSE}
              > 
              
              </ProtectedRoute>
              <Browse/>
            </>
          }>
          </Route>
          
          <Route path="/signin/*" element={
            <>
            <IsUserRedirect 
              user={user}
              loggedInPath={ROUTES.BROWSE}
              path={ROUTES.SIGN_IN}
              exact>
              
            </IsUserRedirect>
            <Signin/>
            </>
          }>
            
          </Route>
          <Route path="/signup" element={
            <>
              <IsUserRedirect
                user={user}
                loggedInPath={ROUTES.BROWSE}
                path={ROUTES.SIGN_UP}
                exact>
                
              </IsUserRedirect>
              <Signup/>
            </>
          }>

          </Route>
          <Route path="/*" element={
            <>
              <IsUserRedirect
                user={user}
                loggedInPath={ROUTES.BROWSE}
                path={ROUTES.HOME}>
                
              </IsUserRedirect>
              <Home/>
            </>
          }> 
            
          </Route>  
          <Route path="*" element={<Navigate to="/" replace/>}/>
        
      </Routes>
    </Router>
    
  );
}

export default App;

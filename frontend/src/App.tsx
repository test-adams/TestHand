import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from './Components/AppBar';
import LandingPage from './Components/LandingPage';
import NotFound from './Components/NotFound';
import LendPage from './Components/LendPage';
import RequestPage from './Components/RequestPage';
import LoginPage from './Components/LoginPage';
import ProfilePage from './Components/ProfilePage';
import { ROUTER_PATHS } from './Constants';




function App() {

	const landingPage = <LandingPage/>
	const notFound = <NotFound/>
	const lendPage = <LendPage/>
	const requestPage = <RequestPage/>
	const loginPage = <LoginPage/>
	const profilePage = <ProfilePage/>

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
       <Routes>
          <Route path={ROUTER_PATHS.landing} element={<AppBar/>}>
						<Route path={ROUTER_PATHS.landing} element={landingPage}/>
						<Route path={ROUTER_PATHS.lend} element={lendPage}/>
						<Route path={ROUTER_PATHS.request} element={requestPage}/>
						<Route path={ROUTER_PATHS.login} element={loginPage}/>
						<Route path={ROUTER_PATHS.profile} element={profilePage}/>
					</Route>
          <Route path={ROUTER_PATHS.error} element={notFound}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from './Components/AppBar';
import LandingPage from './Components/LandingPage';
import NotFound from './Components/NotFound';




function App() {

	const landingPage = <LandingPage/>
	const notFound = <NotFound/>
  return (
    <>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<AppBar />}>
						<Route path="/" element={landingPage}/>
					</Route>
          <Route path="*" element={notFound}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

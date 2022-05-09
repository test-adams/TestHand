import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from './Components/AppBar';
import { NotFound } from './Components/NotFound';




function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<AppBar />}></Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

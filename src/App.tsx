import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import './scss/styles.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path=""           element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }/>
      </Route>
    </Routes>

  );
}

export default App;

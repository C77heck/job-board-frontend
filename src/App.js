
import { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import LandingPage from './main/pages/LandingPage';
import LoadingSpinner from './shared/UIElements/LoadingSpinner';

import './App.scss';
import NavBar from './shared/navigation/Navbar';
import Ads from './ads/pages/Ads';


function App() {


  let routes;
  routes = (
    <Router>
      <Switch>
        <Route path='/' exact>
          <NavBar />
          <LandingPage />
        </Route>
        <Route path='/savedjobs' exact>
          <NavBar />
          <LandingPage />
        </Route>
        <Route path='/jobs' exact>
          <Ads />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  )

  return (
    <main className='center'>
      <Suspense
        fallback={<div><LoadingSpinner asOverlay /></div>}>
        {routes}
      </Suspense>
    </main>
  );
}

export default App;

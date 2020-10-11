import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import Navigation from '../Navigation';
import Rules from '../GuildRules';
import About from '../AboutUs';
import Apply from '../Apply';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Applications from '../Applications';
 
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import styles from './app.css'
 
const App = () => (
  <Router>
    <div className="MainApp">
      <Navigation />
        <div className="appBody">
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
          <Route path={ROUTES.ABOUT} component={About} />
          <Route path={ROUTES.RULES} component={Rules} />
          <Route path={ROUTES.APPLY} component={Apply} />
          <Route path={ROUTES.APPLICATIONS} component={Applications} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
    </div>
  </Router>
);

export default withAuthentication(App);

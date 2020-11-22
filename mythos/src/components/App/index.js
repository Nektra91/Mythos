import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import Navigation from '../Navigation';
import Rules from '../GuildRules';
import Apply from '../Apply';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Applications from '../Applications';
import Application from '../Application';
import AdminUsers from '../Admin/AdminUsers';
 
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import './app.css'
import AdminRecruitment from '../Admin/AdminRecruitment';
import AdminHome from '../Admin/AdminHome';

 
const App = () => (
  <Router>
    <div className="MainApp">
      <Navigation />
      <div className="appBody">
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
        <Route path={ROUTES.RULES} component={Rules} />
        <Route path={ROUTES.APPLY} component={Apply} />
        <Route path={ROUTES.APPLICATIONS} component={Applications} />
        <Route path={ROUTES.APPLICATION} component={Application}/>
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.ADMINUSERS} component={AdminUsers} />
        <Route path={ROUTES.ADMINRECRUITMENT} component={AdminRecruitment} />
        <Route path={ROUTES.ADMINHOME} component={AdminHome} />
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);

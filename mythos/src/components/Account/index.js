import React from 'react';
 
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import BlizzardLink from './BlizzardLink';
import SignOutButton from '../SignOut'
 
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <BlizzardLink uid={authUser.uid} />
        <PasswordChangeForm />
        <SignOutButton />
      </div>
    )}
  </AuthUserContext.Consumer>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);
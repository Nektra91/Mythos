import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyBwolh2i3lfV89ZllJVTVmnG7jQ76fw-4M",
  authDomain: "mythos-website.firebaseapp.com",
  databaseURL: "https://mythos-website.firebaseio.com",
  projectId: "mythos-website",
  storageBucket: "mythos-website.appspot.com",
  messagingSenderId: "698140430251",
  appId: "1:698140430251:web:13f39312136b1eeff20cee"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***
 
  user = uid => this.db.ref(`users/${uid}`);
 
  users = () => this.db.ref('users');
}

export default Firebase;

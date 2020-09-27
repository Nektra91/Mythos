import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

var config = {
    apiKey: "AIzaSyCA3CjaonuFjya_GgolCjrR0FM-mG9zBms",
    authDomain: "old-website-ce1b3.firebaseapp.com",
    databaseURL: "https://old-website-ce1b3.firebaseio.com",
    projectId: "old-website-ce1b3",
    storageBucket: "old-website-ce1b3.appspot.com",
    messagingSenderId: "165199269422",
    appId: "1:165199269422:web:b649834d1ebc5be88d19bf",
    measurementId: "G-114MJDZP78"
  };

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()
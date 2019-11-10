import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCNVmYIje16xc5Z4mQJ9TogwPM2pAFdX8M",
    authDomain: "crwn-db-6b013.firebaseapp.com",
    databaseURL: "https://crwn-db-6b013.firebaseio.com",
    projectId: "crwn-db-6b013",
    storageBucket: "crwn-db-6b013.appspot.com",
    messagingSenderId: "686655988425",
    appId: "1:686655988425:web:c1ede2bbd33ba3d53e6318",
    measurementId: "G-Y5LNZB8QKF"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

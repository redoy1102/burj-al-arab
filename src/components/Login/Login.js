import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig); 
    }
    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
           var {displayName, email} = result.user;
           const signedInUser = {Name: displayName, email}
            setLoggedInUser(signedInUser);

          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn} >Sign In with Google</button>
        </div>
    );
};

export default Login;
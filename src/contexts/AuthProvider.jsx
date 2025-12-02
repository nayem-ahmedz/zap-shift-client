import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { useEffect, useState } from "react";

// outside comp to avoid re-render
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({children}){
    const [ user, setUser ] = useState(null);
    // to show loading status, initially
    const [ loading, setLoading ] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const continueWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // update user info
    const updateUserProfile = (data) => {
        return updateProfile(auth.currentUser, data);
    }

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser);
                setLoading(false);
            } else{
                setUser(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // handle signout
    const logoutUser = () => {
        return signOut(auth);
    }

    // bunding auth related functions, vars
    const authInfo = {
        user,
        loading,
        registerUser,
        loginUser,
        continueWithGoogle,
        logoutUser,
        updateUserProfile
    }
    return(
        <AuthContext value={authInfo}>
            {
                children
            }
        </AuthContext>
    );
}
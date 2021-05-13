import React, {createContext} from 'react';

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';    
import config from '../config/firebase';

const FirebaseContext = React.createContext();

firebase.initializeApp(config);

const db = firebase.firestore();

const Firebase = {

    getCurrenUser: () => {
        return firebase.auth().currentUser
    },

    createUser: async(user) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            const uid = Firebase.getCurrenUser().uid;

            let profilePhotoUrl = 'default';

            await db.collection('users').doc(uid).set({
                username: user.name,
                email: user.email,
                profilePhotoUrl
            })

            if (user.profilePhoto) {
                profilePhoto = await Firebase.uploadProfilePhoto(user.profilePhoto);
            }
            delete user.password

            return {...user, profilePhotoUrl, uid};
        } catch (error) {
            console.log('error @createUser: ', error.message);
        }       
    },

    uploadProfilePhoto: async(uri) => {
        const uid = Firebase.getCurrenUser().uid;

        try {
            const photo = await Firebase.getBlob(uri);
            const imageRef = firebase.storage().ref('profilePhotos').child(uid);
            await imageRef.put(photo);

            const url = await imageRef.getDownloadURL();
            await db.collection('users').doc(uid).update({
                profilePhotoUrl: url,
            });

            return url;

        } catch (error) {
            console.log('error @uploadProfilePhoto: ', error);
        }
    },

    getBlob: async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                resolve(xhr.response);
            };

            xhr.onerror = () => {
                reject(new TypeError('Network request failed.'));
            };
            
            xhr.responseType = 'blob'
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    },
};

const FirebaseProvider =  (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>;
};

export { FirebaseProvider, FirebaseContext};


import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCYFwdjBhJYwSFCfd_2EwKXKTB9AfIUwKs",
    authDomain: "servicebook-fa47f.firebaseapp.com",
    databaseURL: "https://servicebook-fa47f.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
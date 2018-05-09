import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import App from "./components/App/App";

import * as firebase from "firebase";

import { firebaseConfig } from "./properties.js";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;

var database = firebase.database();

var temp = database.ref("/items").on("value", function(snapshot) {
    console.log(snapshot.val());
});
console.log(temp);

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
);

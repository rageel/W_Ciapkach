import React, { Component } from "react";
import "./Login.scss";
import * as firebase from "firebase";
export const provider = new firebase.auth.GoogleAuthProvider();

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            currentItem: "",
            username: "",
            items: [],
            user: null
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login() {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        });
    }

    render() {
        return (
            <div>
                <p className="login">Zaloguj się kontem Google:</p>
                {this.state.user ? (
                    <div>
                        <div className="logged_in">
                            Jesteś zalogowany jako {this.state.user.email}
                        </div>
                        <button
                            className="button form_item"
                            onClick={this.logout}
                        >
                            Google Log Out
                        </button>
                    </div>
                ) : (
                    <button className="button form_item" onClick={this.login}>
                        Google Log In
                    </button>
                )}
            </div>
        );
    }
}

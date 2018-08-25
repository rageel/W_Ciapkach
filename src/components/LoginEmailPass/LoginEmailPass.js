import React, { Component } from "react";
import "./LoginEmailPass.scss";
import * as firebase from "firebase";

const INITIAL_STATE = {
    userEmail: "",
    userPass: "",
    error: "",
    user: null
};

export default class LoginEmailPass extends Component {
    constructor() {
        super();

        this.state = {
            INITIAL_STATE
        };
    }

    takeEmail = e => {
        this.setState({
            userEmail: e.target.value
        });
    };
    takePass = e => {
        this.setState({
            userPass: e.target.value
        });
    };

    onLogin = e => {
        const { userEmail, userPass, error } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(userEmail, userPass)
            .then(authUser => {
                this.setState(() => ({ INITIAL_STATE }));
                alert("Zalogowano");
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: error.message });
            });
        event.preventDefault();
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    onLogout = e => {
        firebase
            .auth()
            .signOut()
            .then(logoutuser => {
                this.setState({ user: null });
                alert("Wylogowano");
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <div className="form">
                    <p className="login">
                        Zaloguj się przy pomocy emaila i hasła:
                    </p>
                    <div>
                        <input
                            className="input form_item"
                            type="email"
                            name="login_email"
                            placeholder="E-mail"
                            onChange={this.takeEmail}
                        />
                        <input
                            className="input form_item"
                            type="password"
                            name="password"
                            placeholder="Hasło"
                            onChange={this.takePass}
                        />
                        {this.state.user ? (
                            <input
                                onClick={this.onLogout}
                                className="button submit button_bottom input form_item"
                                type="submit"
                                value="Wyloguj się"
                            />
                        ) : (
                            <input
                                onClick={this.onLogin}
                                className="button submit button_bottom input form_item"
                                type="submit"
                                value="Zaloguj się"
                            />
                        )}
                    </div>
                </div>

                <div>{this.state.error}</div>
            </div>
        );
    }
}

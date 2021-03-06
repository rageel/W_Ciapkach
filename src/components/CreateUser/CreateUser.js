import React, { Component } from "react";
import "./CreateUser.scss";
import * as firebase from "firebase";

const INITIAL_STATE = {
    newUserEmail: "",
    newUserPass: "",
    error: ""
};

export default class CreateUser extends Component {
    constructor() {
        super();

        this.state = {
            INITIAL_STATE
        };
    }

    takeNewEmail = e => {
        this.setState({
            newUserEmail: e.target.value
        });
    };
    takeNewPass = e => {
        this.setState({
            newUserPass: e.target.value
        });
    };

    onSubmit = e => {
        const { newUserEmail, newUserPass, error } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(newUserEmail, newUserPass)
            .then(authUser => {
                this.setState(() => ({ INITIAL_STATE }));
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: error.message });
            });
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div className="form">
                    <p className="login">Zarejestruj się:</p>
                    <div>
                        <input
                            className="input form_item"
                            type="email"
                            name="login_email"
                            placeholder="E-mail"
                            aria-label="Podaj email"
                            onChange={this.takeNewEmail}
                        />
                        <input
                            className="input form_item"
                            type="password"
                            name="password"
                            placeholder="Hasło"
                            aria-label="Podaj hasło"
                            onChange={this.takeNewPass}
                        />
                        <input
                            onClick={this.onSubmit}
                            className="button submit input form_item"
                            aria-label="Zarejestruj się"
                            type="submit"
                            value="Zarejestruj się"
                        />
                        <div>{this.state.error}</div>
                    </div>
                </div>
            </div>
        );
    }
}

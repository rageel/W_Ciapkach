import React, { Component } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/MainContent/MainContent";
import Footer from "../../components/Footer/Footer";
import GenerateRandom from "../../components/GenerateRandom/GenerateRandom";
import FullDict from "../../components/FullDict/FullDict";
import Login from "../../components/Login/Login";
import AddItem from "../../components/AddItem/AddItem";
import CreateUser from "../../components/CreateUser/CreateUser";
import LoginEmailPass from "../../components/LoginEmailPass/LoginEmailPass";
import Admin from "../../components/Admin/Admin";
import * as firebase from "firebase";
import { userAdminId } from "../../properties.js";

import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    NavLink
} from "react-router-dom";

import "./App.scss";

const activeLinkStyle = {
    textDecoration: "none",
    color: "#333",
    pointerEvents: "none"
};
const About = () => {
    return <p>Slownik jest projektem edukacyjno-humorystycznym.</p>;
};
const Contact = () => {
    return <p>fenniks@gmx.com</p>;
};

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            userAdmin: false
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user && user.uid == userAdminId) {
                this.setState({
                    userAdmin: true
                });
                console.log(user.uid);
            } else {
                this.setState({ user: null });
            }
        });
    }

    render() {
        return (
            <div className="app">
                <Header />
                <nav className="nav">
                    <NavLink
                        className="main-nav__link"
                        exact
                        activeStyle={activeLinkStyle}
                        to="/"
                    >
                        Strona główna
                    </NavLink>
                    <NavLink
                        className="main-nav__link"
                        activeStyle={activeLinkStyle}
                        to="/fulldict"
                    >
                        Full Dictionary
                    </NavLink>
                    <NavLink
                        className="main-nav__link"
                        activeStyle={activeLinkStyle}
                        to="/generaterandom"
                    >
                        Generate Random
                    </NavLink>
                    <NavLink
                        className="main-nav__link"
                        activeStyle={activeLinkStyle}
                        to="/login"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        className="main-nav__link"
                        activeStyle={activeLinkStyle}
                        to="/additem"
                    >
                        Dodaj item
                    </NavLink>
                    <NavLink
                        className="main-nav__link"
                        activeStyle={activeLinkStyle}
                        to="/about"
                    >
                        O słowniku
                    </NavLink>
                    <NavLink
                        className="main-nav__link"
                        activeStyle={activeLinkStyle}
                        to="/contact"
                    >
                        Kontakt
                    </NavLink>
                    {this.state.userAdmin ? (
                        <NavLink
                            className="main-nav__link"
                            activeStyle={activeLinkStyle}
                            to="/admin"
                        >
                            Admin
                        </NavLink>
                    ) : null}
                </nav>
                <Switch>
                    <Route exact path="/" component={MainContent} />
                    <Route path="/generaterandom" component={GenerateRandom} />
                    <Route path="/fulldict" component={FullDict} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/login">
                        <div>
                            <Login />
                            <CreateUser />
                            <LoginEmailPass />
                        </div>
                    </Route>
                    <Route path="/additem" component={AddItem} />
                    {this.state.userAdmin ? (
                        <Route path="/admin" component={Admin} />
                    ) : null}
                    <Route
                        path="*"
                        render={() => <h2>Nie znaleziono ciapek</h2>}
                    />
                </Switch>
                <Footer />
            </div>
        );
    }
}

import React, { Component } from "react";

import "./Header.scss";

export default class Header extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div className="header">
                <h1 className="app-title">W ciapkach</h1>
                <h5>Słownik slangu programistycznego</h5>
            </div>
        );
    }
}

import React, { Component } from "react";

import "./Footer.scss";

export default class Footer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <footer className="main_footer">
                <p className="copyright">&copy; rage el 2018</p>
                <p className="powered_by">Powered by Firebase</p>
            </footer>
        );
    }
}

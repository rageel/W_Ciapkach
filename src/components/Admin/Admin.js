import React, { Component } from "react";
import "./Admin.scss";
import * as firebase from "firebase";
import { userAdminId } from "../../properties.js";
console.log(userAdminId);

export default class Admin extends Component {
    constructor() {
        super();

        this.state = {
            item_full_notAccepted: [],
            userAdmin: false
        };
    }

    componentDidMount() {
        var temp = firebase
            .database()
            .ref("/items")
            .orderByChild("accepted")
            .equalTo(false)
            .on("value", snapshot => {
                console.log(snapshot.val());
                this.setState({
                    item_full_notAccepted: snapshot.val()
                });
            });

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

    //https://firebase.google.com/docs/database/web/read-and-write?authuser=0

    handleAccept = e => {
        console.log(e.target.id);
        firebase
            .database()
            .ref("items/" + e.target.id + "/accepted")
            .set(true);
    };
    //zrob upate do bazy i dodaj true

    render() {
        return (
            <div>
                {this.state.userAdmin ? (
                    <div className="full_dict">
                        {Object.keys(this.state.item_full_notAccepted).map(
                            id => {
                                var item = this.state.item_full_notAccepted[id];
                                return (
                                    <div className="admin_container" key={id}>
                                        <div className="item item_full">
                                            {item.item}
                                        </div>
                                        <div className="item_def item_def_full">
                                            {item.itemDefinition}
                                        </div>
                                        <div className="item_examples">
                                            <span>E.g. </span>
                                            {item.examples}
                                        </div>
                                        <div className="item_tags">
                                            <span>tagi: </span>
                                            {item.tags}
                                        </div>
                                        <button
                                            id={id}
                                            className="accept button"
                                            onClick={this.handleAccept}
                                        >
                                            Akceptuj
                                        </button>
                                    </div>
                                );
                            }
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
}

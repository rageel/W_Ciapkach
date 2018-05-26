import React, { Component } from "react";
import "./GenerateRandom.scss";
import * as firebase from "firebase";

export default class GenerateRandom extends Component {
    constructor() {
        super();

        this.state = {
            itemRandom: ""
        };
    }

    handleClick = () => {
        var temp = firebase
            .database()
            .ref("/items")
            .orderByChild("accepted")
            .equalTo(true)
            .on("value", snapshot => {
                console.log(snapshot.val());
                console.log(this);
                let values = Object.values(snapshot.val());
                let random = Math.floor(Math.random() * values.length);
                this.setState({
                    itemRandom: values[random]
                });
            });
    };

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
                <button className="generate_random" onClick={this.handleClick}>
                    Generuj randomowy item
                </button>

                {this.state.itemRandom !== "" ? (
                    <div className="full_dict">
                        <div className="item item_random">
                            {this.state.itemRandom.item}
                        </div>
                        <div className="item_def item_def_random">
                            {this.state.itemRandom.itemDefinition}
                        </div>
                        <div className="item_examples">
                            <span>E.g. </span>
                            {this.state.itemRandom.examples}
                        </div>
                        <div className="item_tags">
                            <span>Tagi: </span>
                            {this.state.itemRandom.tags}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

import React, { Component } from "react";
import "./FullDict.scss";
import * as firebase from "firebase";

export default class FullDict extends Component {
    constructor() {
        super();

        this.state = {
            item_full: []
        };
    }

    componentDidMount() {
        var temp = firebase
            .database()
            .ref("/items")
            .orderByChild("accepted")
            .equalTo(true)
            .on("value", snapshot => {
                console.log(snapshot.val());
                this.setState({
                    item_full: snapshot.val()
                });
            });
    }

    render() {
        return (
            <div className="full_dict">
                {Object.keys(this.state.item_full).map(id => {
                    var item = this.state.item_full[id];
                    return (
                        <div key={id}>
                            <div className="item item_full">{item.item}</div>
                            <div className="item_def item_def_full">
                                {item.itemDefinition}
                            </div>
                            <div className="item_examples">
                                <span>E.g. </span>
                                {item.examples}
                            </div>
                            <div className="item_tags">
                                <span>Tagi: </span>
                                {item.tags}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

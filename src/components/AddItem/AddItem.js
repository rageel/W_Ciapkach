import React, { Component } from "react";
import "./AddItem.scss";
import * as firebase from "firebase";

export default class AddItem extends Component {
    constructor() {
        super();

        this.state = {
            itemAdded: "",
            defAdded: "",
            examplesAdded: "",
            tagsAdded: "",
            accepted: false,
            user: null
        };
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

    handleAddItem = e => {
        this.setState({
            itemAdded: e.target.value
        });
    };
    handleAddDef = e => {
        this.setState({
            defAdded: e.target.value
        });
    };
    handleAddExamples = e => {
        this.setState({
            examplesAdded: e.target.value
        });
    };
    handleAddTags = e => {
        this.setState({
            tagsAdded: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.user) {
            firebase
                .database()
                .ref("/items")
                .push()
                .set({
                    item: this.state.itemAdded,
                    itemDefinition: this.state.defAdded,
                    examples: this.state.examplesAdded,
                    tags: this.state.tagsAdded,
                    accepted: false
                });
            alert("Brawo! Item dodał się do Ciapek i czeka na akceptację");
        } else {
            alert("Zaloguj się, aby dodać item.");
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                    <input
                        className="input form_item"
                        type="text"
                        name="add_item"
                        placeholder="Dodaj item"
                        required
                        aria-label="Dodaj item"
                        value={this.state.itemAdded}
                        onChange={this.handleAddItem}
                    />
                <input
                    className="input form_item"
                    type="text"
                    name="add_definition"
                    placeholder="Dodaj definicję"
                    required
                    aria-label="Dodaj item"
                    value={this.state.defAdded}
                    onChange={this.handleAddDef}
                />
                <input
                    className="input form_item"
                    type="text"
                    name="add_examples"
                    placeholder="Dodaj przykład(y)"
                    aria-label="Dodaj przykłady"
                    value={this.state.examplesAdded}
                    onChange={this.handleAddExamples}
                />
                <input
                    className="input form_item"
                    type="text"
                    name="add_tags"
                    placeholder="Dodaj tag(i)"
                    aria-label="Dodaj tagi"
                    value={this.state.tagsAdded}
                    onChange={this.handleAddTags}
                />
                <button type="submit" className="button button_bottom">
                    Dodaj item
                </button>
            </form>
        );
    }
}

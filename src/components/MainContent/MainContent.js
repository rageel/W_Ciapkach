import React, { Component } from "react";

import FullDict from "../../components/FullDict/FullDict";
import GenerateRandom from "../../components/GenerateRandom/GenerateRandom";
import "./MainContent.scss";

export default class MainContent extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <main className="main">
                <div className="main_middle">
                    <div className="row">
                        <div className="col question left">
                            <div className="question_text">
                                Martwisz się, bo szef kazał Ci dzwonić do
                                Jasona, ale nie możesz znaleźć numeru?
                            </div>
                        </div>
                        <div className="col question middle">
                            <div className="question_text">
                                A może kazał Ci myć podłogę ajaxem, ale przecież
                                w biurze jest wykładzina?
                            </div>
                        </div>
                        <div className="col question right">
                            <div className="question_text">
                                Powiedziałeś wszystkim, że musisz sprawdzić w
                                Jaknajade ale nikt się nie śmieje? (Pewnie nie
                                zrozumieli.)
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main_statement">
                    Dzięki Ciapkom zrozumiesz, o co chodzi, oraz pokażesz
                    światu, jak mówią prawdziwi insiderzy (czyli ty).
                </div>
            </main>
        );
    }
}

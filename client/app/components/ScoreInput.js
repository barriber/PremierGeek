import React, {Component} from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';
import _ from 'lodash'

export default class ScoreInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            score: ''
        }
    }

    getValidationState() {
        return this.state.score.length === 1 ? 'success' : 'error';
    }

    handleScoreChange(e) {
        const input = e.target.value;
        const numValue = _.toNumber(input);
        if (input !== null && !_.isNaN(numValue) && input.indexOf('.') === -1 && input.length <= 1
            && numValue >= 0 && _.isInteger(numValue)) {
            this.setState({score: e.target.value});
        }
    }

    render() {
        return (
            <FormGroup controlId="scoreInput" className="score-column" validationState={this.getValidationState()}>
                <FormControl className="score-input text-center"
                             onChange={(e) => this.handleScoreChange(e)} value={this.state.score}/>
            </FormGroup>
        );
    }
}
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
    isNumber(input) {
        const numValue = _.toNumber(input);
        
        return input !== null && !_.isNaN(numValue) && input.indexOf('.') === -1 && input.length <= 1
            && numValue >= 0 && _.isInteger(numValue);
    }
    handleScoreChange(e) {
        const {isHomeTeam, betAction, fixtureId} = this.props
        const input = e.target.value;
        if (this.isNumber(input)) {
            this.setState({score: e.target.value});
            betAction(isHomeTeam ? 1 : 2, fixtureId, _.toInteger(input));
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
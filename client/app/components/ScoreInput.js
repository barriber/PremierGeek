import React, {Component} from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';
import _ from 'lodash'

export default class ScoreInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            score: _.isNumber(props.score) ? props.score : ''
        }
    }

    getValidationState() {
        return this.state.score.length === 1 ? 'success' : 'error';
    }

    handleScoreChange(e) {
        const {isHomeTeam, betAction, fixtureId} = this.props
        const regNumber = new RegExp('^[0-9]$');
        const input = e.target.value;
        if (regNumber.test(input) || input === '') {
            this.setState({score: e.target.value});
            if(input !== '' ) {
                betAction(isHomeTeam ? 1 : 2, fixtureId, _.toInteger(input));
            }
        }
    }

    render() {
        return (
            <FormGroup controlId="scoreInput" className="score-column" validationState={this.getValidationState()}>
                <FormControl className="score-input text-center" type="number"
                             onChange={(e) => this.handleScoreChange(e)} value={this.state.score}/>
            </FormGroup>
        );
    }
}
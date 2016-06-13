import React, {Component} from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import PastResultsModal from './PastResultsModal';

export default class UserScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState({showModal: true});
    }


    render() {
        const {points, userName, image, position, bets} = this.props;
        const firstPlaceClass = position === 1 ? 'first-place' : '';
        return (
            <div>
                <Row className={`user-score ${firstPlaceClass}`} onClick={() => this.openModal()}>
                    <Col md={1} sm={1}>
                        {position}
                    </Col>
                    <Col md={2} sm={3}>
                        <Image src={image} responsive circle/>
                    </Col>
                    <Col md={4} sm={4} className="scores-user-name" >
                        {userName}
                    </Col>
                    <Col md={2} mdOffset={3} sm={2} smOffset={2} className="text-center">
                        {points}
                    </Col>
                </Row>
                <PastResultsModal bets={bets} showModal={this.state.showModal} closeModal={() => this.closeModal()}
                                  userName={userName}/>
            </div>
        )
    }
}
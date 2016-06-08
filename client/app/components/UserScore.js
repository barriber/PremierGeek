import React, {Component} from 'react';
import {Row, Col, Image, Modal} from 'react-bootstrap';

export default class UserScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    close() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState({showModal: true});
    }

    showUserResults(bet) {
        console.log(bet);
        return (<div>asdsad</div>)
    }

    render() {
        const {points, userName, image, position, bets} = this.props;
        const firstPlaceClass = position === 1 ? 'first-place' : '';
        return (
            <div>
                <Row className={`user-score ${firstPlaceClass}`}>
                    <Col md={1} sm={1}>
                        {position}
                    </Col>
                    <Col md={2} sm={3}>
                        <Image src={image} responsive circle/>
                    </Col>
                    <Col md={4} sm={4} className="scores-user-name" onClick={() => this.openModal()}>
                        {userName}
                    </Col>
                    <Col md={2} mdOffset={3} sm={2} smOffset={2} className="text-center">
                        {points}
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={() =>this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{userName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.showUserResults(bets)}
                    </Modal.Body>

                </Modal>

            </div>
        )
    }
}
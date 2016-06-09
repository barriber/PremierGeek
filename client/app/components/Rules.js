import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default function Rules() {
    return (
        <Row>
            <Col className="rules" mdOffset={2} md={8} sm={12}>
                <h1 className="rules-title">
                    Premier-Geek Rules
                </h1>
                <div>
                    <p>
                        The purpose of the game is to earn as many points as possible.
                    </p>

                    <p>
                        Every match will have odds provided above each possible result. <br></br>
                        The odds will be updated once in the beginning of each round and will not be updated again.
                    </p>

                    <p>
                        Betting and changes to your bets will be allowed up until 1 minute before match starts.
                    </p>

                    <p>
                        Player that will guess the correct winning side/draw will earn the odds as points. <br></br>
                        For guessing the exact result of the match – the earned points will be multiplied by
                        2. <br></br>
                        For guessing the correct goal difference - earned points will be multiplied by 1.5<br></br>
                        *If the game ended in a draw, extra points for goal difference won't be granted(it's always
                        0)
                    </p>
                    <p>
                        At knockout stage the correct guess of game will be the result after 90min.
                    </p>
                    <p>
                        Good luck :)
                    </p>
                </div>
            </Col>
        </Row>
    );
}
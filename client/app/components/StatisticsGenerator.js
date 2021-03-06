import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import countBy from 'lodash/countBy';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';
import round from 'lodash/round';
import StatisticsTable from './StatisticsTable';

export default function StatisticsGenerator({statisticProp, bets, title, isPercentage, totalMatches}) {
    let position = 0;
    const statisMap = map(bets, (userScores) => {
        const numberOfExactMatch = countBy(userScores.userBetResults, statisticProp);
        let numberOfPoints = numberOfExactMatch.true || 0;
        if(isPercentage === true) {
            numberOfPoints = numberOfPoints / totalMatches * 100;
        }
        return {user: userScores.user, points: round(numberOfPoints, 2)}
    });
    return (
        <div className="scores-section statistic-table">
            <Row>
                <Col md={2} mdOffset={10} sm={2} smOffset={7} className="text-center scores-title">
                    {title}
                </Col>
            </Row>
            {
                map(orderBy(statisMap, ['points'], ['desc']), (userScore) => {
                    const points = isPercentage ? `${userScore.points}%` : userScore.points;
                    return (
                        <StatisticsTable points={points} user={userScore.user}
                                         key={userScore.user.name} position={++position} />
                    );
                })
            }
        </div>
    )
};
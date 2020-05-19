import React, { Component } from 'react';
import { CardColumns, Card, Button } from 'react-bootstrap';
import ImageLoader from '../../common/ImageLoad/ImageLoad';
import skydive from '../../../../assets/skydiving.jpg';
import tandem from '../../../../assets/tandem-skydive.jpg';
import round from '../../../../assets/round-para.jpg';

import "./features.css";

class Features extends Component {
    componentDidMount() {

    }
    render() {

      

        return (
                <CardColumns>
                    <Card>
                        <Card.Header>
                            <ImageLoader image={skydive} style={{ width: '100%' }} />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                Digital LogBook
                            </Card.Title>
                            <Card.Text>
                                Ever stop to think what happens if you lose or destroy your parachute log book?
                            </Card.Text>
                            <Button variant="primary">Learn More</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Permanent Records</Card.Footer>
                    </Card>
                    <Card>
                    <Card.Header>
                        <ImageLoader image={round} style={{ width: '100%' }} />
                     </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                Military and Civilian
                            </Card.Title>
                            <Card.Text>
                                Track everything - round, square, high, low, solo, tandem, formation, basejump. 
                            </Card.Text>
                            <Button variant="primary">Learn More</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Own Your Data</Card.Footer>
                    </Card>
                    <Card>
                        <Card.Header>
                            <ImageLoader image={tandem} style={{ width: '100%' }} />
                         </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                Instructors and Coaches
                            </Card.Title>
                            <Card.Text>
                                Digital attestations, student/coach linkups, more reliable records, no guessing.
                            </Card.Text>
                            <Button variant="primary">Learn More</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Build Your Business</Card.Footer>
                    </Card>
                </CardColumns>
        )
    }
}

export default Features
import { Breadcrumb, CardGroup, Col, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import BoardList from "../component/BoardList"
import { Carousel, Card, Row } from "react-bootstrap"


const Contents = ({LocationId}) => {
    
    return (
        <div align = 'center' >
           <Container style = {{ height : '45rem', overflow : 'hidden' }}>
            <Carousel style = {{ height : '50rem'}} >
                <Carousel.Item style = {{ height : '50rem'}}>
                    <img
                        className="d-block w-100"
                            src="./../img/pexels-ethan-brooke-2376710.jpg"
                            position = 'absolute'
                            margin-top = '-500%'
                            
                    />

                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./../img/pexels-jakob-jin-7237172.jpg"
                        position = 'absolute'
                    />

                </Carousel.Item> 


                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./../img/pexels-aleksandar-pasaric-2848492 (1).jpg"
                        position = 'absolute'
                    />

                </Carousel.Item>
                </Carousel>
            </Container>

        
            <Container>
                
                <br/><br/><h3>동네 이야기</h3><hr/>
                <CardGroup>
                    <Row md ={3} style = {{ width : '100%' }} >

                        <Col md={5} >
                            <Card >

                                <Link to="/TownBoard" >게시판 더보기</Link>
                                <BoardList LocationId={LocationId} />
                            </Card>
                        </Col>

                        <Col md={3} >
                            <Card >
                                <h4>날씨</h4>
                            </Card>
                        </Col>

                        <Col md={3} >
                            <Card>
                            <h4>코로나</h4>
                            </Card>
                        </Col>

                    </Row>
                </CardGroup>


                <br/><br/><h3>동네 맛집</h3><hr/>
                <CardGroup>
                <Row md ={4} style = {{ width : '100%' }} >
                    <Card>
                        <Card.Img variant="top" src="./../img/pexels-jonathan-borba-2983101.jpg" />
                        <Card.Body>
                            <Card.Title>OOO햄버거</Card.Title>
                            <Card.Text>
                               This is OOO햄버거
                            </Card.Text>
                        </Card.Body>

                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>

                    </Card>

                    <Card>
                        <Card.Img variant="top" src="./../img/pexels-lisa-1279330.jpg" />
                        <Card.Body>
                            <Card.Title>OOO파스타</Card.Title>
                            <Card.Text>
                                     This is OOO파스타
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>

                    <Card>
                        <Card.Img variant="top" src="./../img/pexels-jonathan-borba-2983101.jpg" />
                        <Card.Body>
                            <Card.Title>OOO햄버거</Card.Title>
                            <Card.Text>
                               This is OOO햄버거
                            </Card.Text>
                        </Card.Body>

                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>

                    </Card>

                    <Card>
                        <Card.Img variant="top" src="./../img/pexels-lisa-1279330.jpg" />
                        <Card.Body>
                            <Card.Title>OOO파스타</Card.Title>
                            <Card.Text>
                                     This is OOO파스타
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>

                    </Row>
                </CardGroup>
            </Container>
        </div>
    )
}

export default Contents

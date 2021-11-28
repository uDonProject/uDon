import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const LocalList = ({localData, userSi}) => {


    return (
        <>
            <Navbar bg="light" variant = "light">
                <Container>
                 <Navbar.Brand>홍길동 님의 지역은 {userSi}</Navbar.Brand>
                 <Nav className="me-auto">

                    <br/>
                    {localData.map((ldata) => {

                        return (
                            <>
                                <Nav.Link>{ldata.name}</Nav.Link>
                            </>
                        )

                    })}
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default LocalList

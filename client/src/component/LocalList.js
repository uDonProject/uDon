import { Container, Nav, Navbar } from "react-bootstrap";

const LocalList =  ({localData, userSi, userName}) => {


    return (
        <>
            <Navbar bg="light" variant = "light">
                <Container>
                 <Navbar.Brand>나의 동네 {userSi}</Navbar.Brand>
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

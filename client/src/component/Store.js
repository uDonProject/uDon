import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Card, Row } from "react-bootstrap"

const Store = () => {

    const [StoreData, setStoreData] = useState([])

    const ClientId = "클라이언트 아이디";
    const ClientSecret = "클라이언트 시크릿키";

    const headerdata = {
        'X-Naver-Client-Id': ClientId,
        'X-Naver-Client-Secret': ClientSecret
    }


    useEffect(() => {

        const url = "/naver/v1/search/local.json?";
        let params = encodeURI('query') + '=' + '서울 음식점';
        params += '&' + encodeURI('display') + '=' + '4';
        params += '&' + encodeURI('start') + '=' + '1';
        params += '&' + encodeURI('soft') + '=' + 'comment';

        const Finalsurl = url + params;


        Axios({
            method: 'get',
            url: Finalsurl,
            headers: headerdata,
            withCredentials: true

        }).then((res) => {
            setStoreData(res.data.items)
        })


    }, [])



    return (
        <div>
            <br />
            <h4>네이버 지역 API</h4>

            <Row md={4} style={{ width: '100%' }} >
                {StoreData.map((data) => {
                    return (
                        <>

                            <Card>
                                <Card.Body>

                                    <Card.Img variant="top" src="./../img/pexels-kaique-rocha-331990.jpg" />
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Text>
                                        {data.address}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{data.category}</small>
                                </Card.Footer>
                            </Card>


                        </>

                    )
                }

                )}

            </Row>

        </div>
    )
}

export default Store





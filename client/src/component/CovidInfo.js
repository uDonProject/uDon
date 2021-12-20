import { useState, useEffect } from 'react'
import Axios from 'axios'
import { CardGroup, Accordion} from "react-bootstrap"

const CovidInfo = () => {

    const day = new Date();

    const [Day, setDay] = useState('');

    const [CovidInfoData, setCovidInfoData] = useState([])

    const ServiceKey = "서비스키";

    

    useEffect( () => {
        
        const y = day.getFullYear();
        const m = (('0' + (day.getMonth() + 1)).slice(-2));
        const d = (('0' + (day.getDate() -1 )).slice(-2));
        const totalDay  = y+m+d;

        setDay(totalDay)

        const url = "/data/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?";
        let params = encodeURI('ServiceKey') + '=' + ServiceKey;
        params += '&' + encodeURI('pageNo') + '=' + '1';
        params += '&' + encodeURI('numOfRows') + '=' + '10';
        params += '&' + encodeURI('startCreateDt') + '=' + totalDay;
        params += '&' + encodeURI('endCreateDt') + '=' + totalDay;
    
        const Finalsurl = url + params;
        
    

        Axios( {
           method : 'get' ,
           url : Finalsurl,
           withCredentials : true

        } ).then( (res) => {

            setCovidInfoData(res.data.response.body.items.item)
        })


    } ,[] )



    return (
        <div>
            <br/>
            
            <h4>코로나 현황 {Day} </h4>
            <CardGroup>
            
                {CovidInfoData.map((data) => {
                    return (
                        <>

                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{data.gubun}</Accordion.Header>
                                    <Accordion.Body>
                                        {data.localOccCnt}
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>

                        </>

)
}

)}

</CardGroup>
        </div>
    )
}

export default CovidInfo





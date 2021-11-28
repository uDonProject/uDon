import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Table, Card } from 'react-bootstrap'


const BoardList = ({LocationId}) => {

    const [dataList, setDataList] = useState([]);
  

    useEffect(() => {
        Axios.get(`http://localhost:3001/${LocationId}`).then((response) => {
            console.log(response.data);
            setDataList(response.data)
        })
    },[setDataList])


    
    return (
        

            <div align="center" >
                
                <Table responsive style={{width : '35rem'}}>

                    <thead >
                    <th>작성자</th>
                    <th>제목</th>
                    <th>날짜</th>
                    </thead>
                    <tbody>
                    {dataList.map((data) => {

                        return (

                            <tr key = {data.id}>
                                <td>{data.nickname}</td>
                                <td> <Link to ={`/BoardDetail/${data.id}`}>{data.title}</Link></td>
                                
                                
                                 {/* <td> <Link to = { { pathname : `/BoardDetail/${data.id}`,
                                            state : {check : "ss"} }   }>{data.title}</Link></td> */}

                                {/* <td>  <Link to ={gogo}>{data.title}</Link> </td>  */}

                                {/* <Navigate to = {`/BoardDetail/${data.id}`}>
                                <td> {data.title}</td> </Navigate>                   */}
                                
                                <td>{data.regdate}</td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
                    
            </div>
    )
}

export default BoardList

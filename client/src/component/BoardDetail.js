import { useState, useEffect } from "react";
import Axios from 'axios';
import { useParams, useNavigate } from "react-router"
import { Link } from 'react-router-dom'
import BoardTableRows from "./BoardTableRows";
import BoardTableRowsEdit from "./BoardTableRowsEdit";
import { Table, Card } from 'react-bootstrap'
import BoardComment from './BoardComment'

const BoardDetail = () => {

    const params = useParams().id;
    const [dataDetail, setDataDetail] = useState([]);


    useEffect(() => {

        Axios.get(`http://localhost:3001/BoardDetail/${params}`).then((response) => {

            setDataDetail(response.data[0])
            seteditDataFrom(response.data[0])
        })

    }, [setDataDetail])


    const [RowsEditFlag, setRowsEditFlag] = useState(false)

    const RowsEditClick = (event) => {
        event.preventDefault();
        setRowsEditFlag(true)
    }

    const [editDataForm, seteditDataFrom] = useState({})

    const updateBoardDataSet = (event) => {

        event.preventDefault();

        const keyName = event.target.getAttribute("name");
        const keyValue = event.target.value;

        const newDataForm = { ...editDataForm }
        newDataForm[keyName] = keyValue;

        seteditDataFrom(newDataForm)

    }

    const navigate = useNavigate();

    const insertUpdateData = () => {

        Axios({
            method: 'put',
            url: `http://localhost:3001/updateBoardData/${editDataForm.id}`,
            data: {
                "title": editDataForm.title,
                "content": editDataForm.content
            }
        })

        //에러 처리 확인 필요
        alert('수정 완료')
        navigate('/townBoard')

    }



    return (
        <div align="center">


            <Card style={{ width: '50%' }}>
                {/* <Row md ={3} style = {{ width : '100%' }} > */}
                <Table border="1" align="center">
                    <thead>
                        <tr>
                            <td>상세내용</td>
                        </tr>
                    </thead>

                    <tbody>
                        {(RowsEditFlag) == false ?
                            (<Card> <BoardTableRows dataDetail={dataDetail} /> </Card>) :
                            (<BoardTableRowsEdit editDataForm={editDataForm} updateBoardDataSet={updateBoardDataSet} insertUpdateData={insertUpdateData} />)}

                    </tbody>
                </Table>
                <label>
                    <button onClick={RowsEditClick}>수정</button>

                    <Link to={`/BoardDelete/${dataDetail.id}`}><button>삭제</button></Link>
                </label>
            </Card>

            <BoardComment />

        </div>
    )

}
export default BoardDetail

import { useState } from "react"
import Axios from 'axios';
import { useNavigate } from "react-router";
import { Table, Card } from 'react-bootstrap'

const BoardInput = () => {

    const navigate = useNavigate();

    const [inputDataForm, setInpuDataForm] = useState({
            location : 3,
            title : '',
            content : '',
            writer : 4,
            status : 1,
    });

    const onSubmit = () => {

        Axios(
            {
                method : 'post',
                url : `http://localhost:3001/newBoardData`,
                data : inputDataForm
            }
        ).then(alert('입력성공'))

        navigate('/')
        
    }

    const onChange  = (event) => {

        event.preventDefault();
        
      const a = event.target.getAttribute('name')
      const value = event.target.value
        

        const newData = {...inputDataForm}
        newData[a] = value

        setInpuDataForm(newData)

        console.log(inputDataForm);
    }


    return (

    <div>
        <form onSubmit ={onSubmit}>
            <Table>
                    
                <thead>
                    <tr>
                       <td> 입력</td><td> 내용</td>
                    </tr>
                    

                   </thead>
                   <tbody> 
                    <tr>
                        <td>제목</td>
                        <td><input type = "text" required onChange = {onChange} name = "title"/></td>
                    </tr>

                    <tr>
                        <td>내용</td>
                        <td><input type = "text" required onChange = {onChange}  name = "content"/></td>
                    </tr>
                    </tbody>
            </Table>
            {/* <button onClick = {save}>저장!!!</button> */}
            <button type = "submit">저장!!!222</button>
        </form>
        </div>
    )
}




export default BoardInput

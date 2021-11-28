import Axios from 'axios';
import { useEffect } from "react";
import { useParams } from "react-router"
import { useNavigate } from 'react-router';

const BoardDelete = () => {

    const params  = useParams().id;
    const Navigate = useNavigate();
    console.log( params);

    useEffect ( () => {
        
        Axios.delete(`http://localhost:3001/BoardDeleteData/${params}`).then( (response) => {
                
                if(response.status == 200){

                    console.log(response);
                    alert('삭제 성공')
                    Navigate('/')
                }
                
                else{
                    alert('삭제 실패')
                    Navigate('/')
                }
        })
    })

    return (
        
        <div>
            삭제 중..            
        </div>
    )
}

export default BoardDelete

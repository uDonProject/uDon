import BoardList from "../component/BoardList"
import { Link } from "react-router-dom"


const TownBoard = () => {
    
    return (
        <div>
                <h1>TownBoard</h1>
                <Link to ="/InputDataBoard">게시글 삽입</Link>

                <BoardList/>
                
        </div>
    )
}


export default TownBoard

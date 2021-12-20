import {  useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from './../UserContext/UserContext'

const Logout = () => {
  const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate()

      useEffect( () =>{

        axios.get( 'http://localhost:3001/Logout' ).then(() => {

          alert('로그아웃 성공~!')
          setUser(null)
          navigate(`/`)

        })

      } ,[])  


    return (
        <div>

          <br/><br/><br/><br/><br/>

            <h1>다음에 또 만나요~!~!</h1>

        </div>
    )
}





export default Logout



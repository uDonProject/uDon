import Axios from 'axios'
import {  useState , useEffect, useCallback} from 'react'
import LocalList from './LocalList'


const Header = ({ LocationId }) => {

    const [localData, setLocalData] = useState([])
    const [userSi, setUserSi] = useState()


    const axiosConnect =  () => {

            Axios.get(`http://localhost:3001/localNum/${LocationId}`).then(
                (response) => { setLocalData(response.data) 
                                setUserSi(response.data[0].siName) 
            }
            )
            

     }

        
        
        useEffect(() => {
            axiosConnect()
        }, [setLocalData])
        
        console.log(userSi);



    return (
        <LocalList localData ={localData} userSi ={userSi}/>
    )


}


export default Header


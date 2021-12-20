import { Table, Card } from 'react-bootstrap'
import { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router";
import { UserContext } from './../UserContext/UserContext.js'


const Login = () => {

    const { user, setUser } = useContext(UserContext);

    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");


    const navigate = useNavigate();
    const login = async () => {

        axios.defaults.withCredentials = true;

        await axios({
            method: "post",

            data: {
                loginid: loginId,
                passwd: loginPw,
            },

            url: 'http://localhost:3001/Login',
            withCredentials: true,

        }).then(

            (res) => {

                if (res.status == 200) {

                    setUser(res.data)

                    navigate(`/`, {
                        state: res.data

                    })


                }
            }
        )



    };


    return (
        <div align="center">
            <h1>로그인</h1>

            <Card style={{ width: '25%' }}  ><Table>
                <thead></thead>
                <tbody>

                    <tr> <td>아이디</td><td> <input type="text" required onChange={e => setLoginId(e.target.value)} placeholder='아이디' />  </td></tr>
                    <tr> <td>비번</td><td><input type="text" required onChange={e => setLoginPw(e.target.value)} placeholder='비번' /></td></tr>
                    <tr> <td colspan="2"><input type="button" value="로그인" onClick={login} /></td></tr>

                </tbody>

            </Table></Card>


        </div>

    )


}

export default Login

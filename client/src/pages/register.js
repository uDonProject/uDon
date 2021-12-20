import { Table, Card } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validateInfo from './validateInfo.js';

const Register = () => {

    const [registerId, setRegisterId] = useState("");
    const [registerPw, setregisterPw] = useState("");
    const [registerNickname, setregisterNickname] = useState("");
    const [registerName, setregisterName] = useState("");
    const [registerGender, setregisterGender] = useState(1);
    const [registerLocation, setregisterLocation] = useState(7);


    const [validateRe, setValidatere] = useState({});

    const Navigate = useNavigate();

    const register = () => {

        const validateData = {
            email: registerId,
            passwd: registerPw,
            nickname: registerNickname,
            name: registerName,
        }


        const validateReturn = validateInfo(validateData)

        if (Object.keys(validateReturn).length > 0) {

            setValidatere(validateReturn)

        } else {

            axios({
                method: "post",
                data: {
                    loginid: registerId,
                    passwd: registerPw,
                    nickname: registerNickname,
                    name: registerName,
                    gender: registerGender,
                    location: registerLocation,
                    status: 1,
                    superuser: 0,
                },

                // //withCredentials : true,
                url: 'http://localhost:3001/Register'
            })
                .then(() => {


                    alert('가입성공')
                    Navigate('/Login')

                }

                )
        }


    }


    return (
        <div align="center">
            <h1>회원가입</h1>

            <Card style={{ width: '30%' }}  ><Table>
                <thead></thead>
                <tbody>
                    <tr> <td>아이디(Email)</td><td> <input type="text" id='email' value={registerId} onChange={e => setRegisterId(e.target.value)} />  </td></tr>
                    {validateRe.email && <p><b>{validateRe.email}</b></p>}
                    <tr> <td>비번</td><td><input type="text" id='passwd' value={registerPw} onChange={e => setregisterPw(e.target.value)} /></td></tr>
                    {validateRe.passwd && <p><b>{validateRe.passwd}</b></p>}
                    <tr> <td>닉네임</td><td><input type="text" id='nickname' value={registerNickname} onChange={e => setregisterNickname(e.target.value)} /></td></tr>
                    {validateRe.nickname && <p><b>{validateRe.nickname}</b></p>}
                    <tr> <td>이름</td><td><input type="text" id='name' value={registerName} onChange={e => setregisterName(e.target.value)} /></td></tr>
                    {validateRe.name && <p><b>{validateRe.name}</b></p>}


                    <tr> <td colspan="2"><input type="button" value="가입" onClick={register} /></td></tr>
                </tbody>

            </Table></Card>


        </div>

    )

}

export default Register

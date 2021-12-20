import { Card } from 'react-bootstrap'
import { useState, useEffect } from 'react';

import Testdata from './testdata'


//프론트 구현(로그인 작업으로 인한 미완성)

const BoardComment = () => {

    useEffect(() => {
        setCommentShowData(Testdata())
    }, [])

    const [commentShowData, setCommentShowData] = useState([])
    const [commentInputData, setCommentInputData] = useState({})

    //기본 값 셋팅
    const [commentInput, setCommentInput] = useState({
        id: null,
        pid: null,
        doc_id: 3,
        content: '',
        writer: 5,
        status: 1,
    })

    const commentoriginal = commentShowData.filter(
        (showdata) => showdata.pid === null
    )


    const getReplies = (id) => {
        return commentShowData.filter((replyData) => replyData.pid == id)
    }

    //일반 댓글용
    const onChange = (event) => {

        event.preventDefault();

        const keyName = event.target.getAttribute("name")
        const keyValue = event.target.value;

        const commentInputData = { ...commentInput }
        commentInputData[keyName] = keyValue;
        setCommentInputData(commentInputData)
    }


    const inputComment = () => {

        setCommentShowData(commentShowData => [...commentShowData, commentInputData])

    }



    const [commentInputDataRe, setCommentInputDataRE] = useState({})

    const onChangeRe = (event) => {

        event.preventDefault();

        const keyName = event.target.getAttribute("name")
        const keyValue = event.target.value;

        const commentInputData = { ...commentInput }
        commentInputData[keyName] = keyValue;

        setCommentInputDataRE(commentInputData)

    }


    //대댓글 추가
    const inputReply = (inputPid) => {


        const addPid = { ...commentInputDataRe }
        addPid['pid'] = inputPid;
        setCommentInputDataRE(addPid)

        setCommentShowData(setCommentShowData => [...setCommentShowData, addPid])


    }


    // 댓글 부분

    const [replyflag, setReplyflag] = useState(null)

    const handleReply = (event, data) => {
        event.preventDefault();
        setReplyflag(data);
    }



    return (
        <>
            <br />
            <br />
            <Card style={{ width: '50%' }}>
                <h3>댓글 쓰기</h3>
                <label>
                    <input type="text" name="content" onChange={onChange} ></input>
                    <button onClick={inputComment} >입력</button></label>
            </Card>
            {commentoriginal.map((data) => {
                return (
                    <>

                        <Card style={{ width: '50%' }}>
                            <div key={data.id} align="left">아이디 : {data.writer}</div>

                            <span> 내용 :  {data.content}</span>
                        </Card>
                        <br />
                        <Card style={{ width: '40%' }}>
                            <div>{(getReplies(data.id)).map((replydata) => {

                                return (<><h6> 댓글 내용 : {replydata.content} </h6></>)
                            }

                            )}
                            </div>
                            {/* <span onClick={(event) => handleReply(event, data.id)  }>답글</span>  */}
                            <br />
                            {/* {(replyflag) == false ? (<span onClick={replyClick}>   // 답글</span>) : ( <><input type = "text"/> <button >입력</button> </>)} */}
                            <div align="right">
                                {replyflag === data.id ?
                                    (<><input type="text" name="content" onChange={onChangeRe} />
                                        <button onClick={() => inputReply(data.id)}>입력</button> </>)

                                    : <button onClick={(event) => handleReply(event, data.id)}> 댓글달기</button>}
                            </div>
                        </Card>
                    </>

                )
            }
            )}

            <br />



        </>
    )


}
export default BoardComment
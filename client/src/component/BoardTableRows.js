const BoardTableRows = ({dataDetail}) => {

    return (   <> 
                    <tr>
                        <td>{dataDetail.nickname}</td>
                    </tr>

                    <tr>
                        <td>{dataDetail.title}</td>
                    </tr>
                    <tr>
                        <td>{dataDetail.content}</td>
                    </tr>

                    <tr>
                        <td>{dataDetail.regdate}</td>
                    </tr> 
             </>
    )

}

export default BoardTableRows

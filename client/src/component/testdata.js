
const Testdata = () => {

    return [
        {
            id : 1,
            pid : null,
            doc_id : 3,
            content : "테스트1",
            writer : 5,
            status : 1,
            regdate : "2021-00-00"
        },
        {
            id : 2,
            pid : null,
            doc_id : 3,
            content : "테스트2",
            writer : 5,
            status : 1,
            regdate : "2021-00-00"
        },
        {
            id : 3,
            pid : 1,
            doc_id : 3,
            content : "대댓글테스트1",
            writer : 5,
            status : 1,
            regdate : "2021-00-00"
        },
        {
            id : 4,
            pid : 1,
            doc_id : 3,
            content : "대댓글테스트2",
            writer : 5,
            status : 1,
            regdate : "2021-00-00"
        },
        {
            id : 5,
            pid : 1,
            doc_id : 3,
            content : "대댓글테스트3",
            writer : 5,
            status : 1,
            regdate : "2021-00-00"
        },


    ]
}

export default Testdata

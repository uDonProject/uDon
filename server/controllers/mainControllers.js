import db from './../udonDb/udonDb.js'



export function getBoardList(req, res) {

    const locationId = req.params.id;
    console.log("지역 id" + locationId);

    db.query("select l.*, d.* from (select m.nickname , d.* from Member m join Document d on m.id = d.writer) d join Location l on d.location = l.id where l.pid = ?", locationId, (err, result) => {
        
        if(err){
            console.log(err);
    
        }else{
             res.send(result)
             console.log(result);
        }
    })
}



export function getBoardDetail(req, res){
    
        const documentId = req.params.id;
        console.log(documentId);
    
        const sql = 'select m.nickname , d.* from Member m join Document d on m.id = d.writer where d.id = ?'
        db.query(sql, documentId, (err,result) => {
    
            if(err){
                console.log(err);
        
            }else{
    
                //만약 ejs였다면 res.render
                
                 res.send(result)
                console.log(result);
    
            }

        } )

}



export function updateBoardData( req, res) {

        const ducumentId = req.params.id;

        const documentTitle = req.body.title;
        const documentContent = req.body.content;
        
        const sql = 'update Document set title=?, content = ? where id = ?'

        db.query(sql, [documentTitle,documentContent,ducumentId], (err, result) => {

            if(err) { console.log( err )}
            else { res.send(result)  }
    
        }) 
}


export function newBoardData (req, res) {

    const documentLocation = req.body.location;
    const documentTitle = req.body.title;
    const documentContent = req.body.content;
    const documentWriter = req.body.writer;
    const documentStatus = req.body.status;

    console.log(documentStatus);

    const sql = "insert into Document( location, title, content, writer, status) values(?,?,?,?,?);"

    
    db.query(sql, [documentLocation,documentTitle,documentContent,documentWriter,documentStatus],(err, result) =>{

        if(err) { console.log( err )}
        else { 
            console.log("입력성공");
            res.send(result)  }
    })

}


export function deleteBoardData( req, res ) {

    const documentId = req.params.id;
    const sql = 'delete from Document where id = ?'

    db.query(sql, documentId, (err, result) => {

        if(err) { console.log( err )}
        else { res.send(result) 
                console.log('삭제 성공'); }

    })
}



export function getLocalNum(req, res) {

    const localId  = req.params.localId;

    //키값이 같을경우, 중복으로 인식됌 >>alias로 모두 정해야함
     const sql = 'select si.id,  si.name as siName, gu.id as gu_ID, gu.name from Location si left outer join Location gu on si.id = gu.pid where si.id = ?'
    

    db.query(sql, localId, (err, result) => {
        if(err) {console.log( err)}
        else{ 
            res.send(result) 
            console.log('성공');
        }
    })



}
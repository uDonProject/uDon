import db from './../udonDb/udonDb.js'
import bcrypto from 'bcryptjs'
import passport from 'passport';

export function getBoardList(req, res) {

    const locationId = req.params.id;

    db.query("select l.*, d.* from (select m.nickname , d.* from Member m join Document d on m.id = d.writer) d join Location l on d.location = l.id where l.pid = ?", locationId, (err, result) => {

        if (err) {
            console.log(err);

        } else {
            res.send(result)
            console.log(result);
        }
    })
}


export function getBoardDetail(req, res) {

    let userData;

    if (req.user) {
        userData = req.user;
    }

    const documentId = req.params.id;
    console.log(documentId);

    const sql = 'select m.nickname , d.* from Member m join Document d on m.id = d.writer where d.id = ?'
    db.query(sql, documentId, (err, result) => {

        if (err) {
            console.log(err);

        } else {

            res.send(result)
            console.log(result);

        }

    })

}



export function updateBoardData(req, res) {

    const ducumentId = req.params.id;

    const documentTitle = req.body.title;
    const documentContent = req.body.content;

    const sql = 'update Document set title=?, content = ? where id = ?'

    db.query(sql, [documentTitle, documentContent, ducumentId], (err, result) => {

        if (err) { console.log(err) }
        else { res.send(result) }

    })
}


export function newBoardData(req, res) {

    const documentLocation = req.body.location;
    const documentTitle = req.body.title;
    const documentContent = req.body.content;
    const documentWriter = req.body.writer;
    const documentStatus = req.body.status;

    console.log(documentStatus);

    const sql = "insert into Document( location, title, content, writer, status) values(?,?,?,?,?);"


    db.query(sql, [documentLocation, documentTitle, documentContent, documentWriter, documentStatus], (err, result) => {

        if (err) { console.log(err) }
        else {
            console.log("입력성공");
            res.send(result)
        }
    })

}


export function deleteBoardData(req, res) {

    const documentId = req.params.id;
    const sql = 'delete from Document where id = ?'

    db.query(sql, documentId, (err, result) => {

        if (err) { console.log(err) }
        else {
            res.send(result)
            console.log('삭제 성공');
        }

    })
}



export function getLocalNum(req, res) {


    let localId = req.params.localId;
    let userNickname;

    if (req.user) {

        localId = req.user.location;
        userNickname = req.user.nickname;

    } else {
        localId = req.params.localId;
        userNickname = null;
    }


    const sql = 'select si.id,  si.name as siName, gu.id as gu_ID, gu.name from Location si left outer join Location gu on si.id = gu.pid where si.id = ?'


    db.query(sql, localId, (err, result) => {
        if (err) { console.log(err) }
        else {

            result[0]["nickName"] = userNickname;
            res.send(result)
        }
    })

}


export async function userRegister(req, res) {

    const loginid = req.body.loginid
    const nickname = req.body.nickname
    const name = req.body.name
    const gender = req.body.gender
    const location = req.body.location
    const status = req.body.status
    const superuser = req.body.superuser


    const findUserData = await findUser(loginid)

    if (findUserData.length < 1) {

        const hashPassword = await bcrypto.hash(req.body.passwd, 10)

        const sql = "insert into Member(loginid, passwd, nickname, name, gender, location, status, superuser) values(?,?,?,?,?,?,?,?)"

        db.query(sql, [loginid, hashPassword, nickname, name, gender, location, status, superuser], (err, result) => {

            if (err) { console.log(err) }

            else {
                console.log("가입 성공");
                res.send(result)
            }
        })

    }

}






export async function userLogin(req, res, next) {

    passport.authenticate('local', (err, user) => {

        console.log(user);
        if (err) throw err;

        if (!user) res.send("유저 없음")

        else {
            console.log(req.loginid)

        }

    })(req, res, next)


}



export async function findUser(loginid) {
    const sql = "select * from Member where loginid = ?"

    return new Promise((resolve, reject) => {

        db.query(sql, [loginid], function (err, result) {
            if (err) {
                reject(console.log(err))
            }

            else {
                return resolve(result)
            }
        })

    })


}


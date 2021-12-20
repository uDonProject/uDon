import express from 'express';
import { getBoardList, getBoardDetail, deleteBoardData, updateBoardData, newBoardData, getLocalNum, userRegister } from './../controllers/mainControllers.js'
import cors from 'cors';
import passport from 'passport';

const router = express.Router();

router.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.get('/local/:id', getBoardList)
router.get('/localNum/:localId', getLocalNum)
router.get('/BoardDetail/:id', getBoardDetail)

router.delete('/BoardDeleteData/:id', deleteBoardData)

router.put('/updateBoardData/:id', updateBoardData)

router.post('/newBoardData', newBoardData)
router.post('/Register', userRegister)
router.post('/Login',
  passport.authenticate('local', { failureRedirect: 'https://localhost:3000/' }),
  function (req, res) {

    console.log(req.user);
    res.json(req.user);

  }
);



router.get('/Logout', (req, res) => {

  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ msg: "쿠키 삭제 완료" })

  });

}
);



export default router;


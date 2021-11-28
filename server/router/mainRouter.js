import express from 'express';
import { getBoardList , getBoardDetail, deleteBoardData ,updateBoardData, newBoardData, getLocalNum } from './../controllers/mainControllers.js'


const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended:false}));

router.get('/:id', getBoardList)
router.get('/localNum/:localId', getLocalNum)
router.get('/BoardDetail/:id', getBoardDetail)
router.delete('/BoardDeleteData/:id', deleteBoardData)
router.put('/updateBoardData/:id', updateBoardData)
router.post('/newBoardData', newBoardData)

export default router;


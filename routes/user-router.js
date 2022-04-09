const { Router } = require('express');
const { userGet, userPut, userPost, userDelete } = require('../controllers/user-controller');

const router = Router();

router.get('/', userGet);
router.put('/:id', userPut);
router.post('/', userPost);
router.delete('/', userDelete);

  // router.put('/', (req, res) =>{
  //   res.json({
  //       msg: 'PUT API'
  //   });
  // });
  // router.post('/', (req, res) =>{
  //   res.status(201).json({
  //       msg: 'POST API'
  //   });
  // });
  // router.delete('/', (req, res) =>{
  //   res.json({
  //       msg: 'DELETE API'
  //   });
  // });
  module.exports = router;
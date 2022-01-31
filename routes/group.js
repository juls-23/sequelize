const {Router} = require('express');
const multer  = require('multer');
const path  = require('path');
const GroupController = require('../controllers/group.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/images') )
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ '-' + file.originalname)
  }
})
const upload = multer({ storage })


const groupRouter = Router();

groupRouter.get('/:userId', GroupController.getGroupsByUser);

groupRouter.post('/', GroupController.createUserGroup);
groupRouter.post('/:groupId/image', upload.single('image'), GroupController.createImageForGroup);
groupRouter.post('/:groupId', GroupController.addUserToGroup);


module.exports = groupRouter;
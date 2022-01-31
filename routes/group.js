const {Router} = require('express');
const multer  = require('multer');
const path  = require('path');
const GroupController = require('../controllers/group.controller');
const { checkGroup } = require('../middlewares/group.mw');
const { checkUser } = require('../middlewares/user.mw');

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
groupRouter.get('/:groupId/users', GroupController.getUsersByGroup);
groupRouter.get('/', GroupController.getAllGroups);

groupRouter.post('/', GroupController.createUserGroup);
groupRouter.post('/:groupId/image', upload.single('image'), GroupController.createImageForGroup);
groupRouter.post('/:groupId', checkGroup, GroupController.addUserToGroup);

groupRouter.patch('/:userId', checkUser, GroupController.removeUserFromGroup);
groupRouter.patch('/:groupId/settings', checkGroup, GroupController.updateGroupSettings);

groupRouter.delete('/:groupId', checkGroup,  GroupController.deleteGroup);


module.exports = groupRouter;
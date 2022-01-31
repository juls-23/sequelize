const {Router} = require('express');
const TaskController = require('../controllers/task.controller');
const {checkUser} = require('../middlewares/user.mw');
const {checkUsersTask} = require('../middlewares/task.mw');

const taskRouter = Router();

taskRouter.post('/:userId', checkUser, TaskController.createTask);
taskRouter.get('/:userId', checkUser, TaskController.getUserTasks);
taskRouter.patch('/:userId', checkUser, checkUsersTask, TaskController.updateTask);
taskRouter.delete('/:userId', checkUser, checkUsersTask, TaskController.deleteTask);

module.exports = taskRouter;
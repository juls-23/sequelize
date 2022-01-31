const createError = require('http-errors');
const {User, Task} = require('../models');

module.exports.checkUsersTask = async (req, res, next)=>{
  try {
    const {params:{userId}, body:{taskId}} = req;
    const task = await Task.findOne({where:{id:taskId, userId: userId}})
    if(!task){
      const error = createError(404, 'Task not found');
      return next(error);
    }
    req.task = task;
    next();
  } catch (error) {
    
  }
}
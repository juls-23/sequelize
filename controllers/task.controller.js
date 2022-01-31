const {Task} = require('../models');


module.exports.createTask = async(req, res, next)=>{
  try {
    const {body, userInstance} = req;
    const task = await userInstance.createTask(body);
    res.status(201).send({data: task});
  } catch (error) {
    next(error)
  }
}

module.exports.getUserTasks = async(req, res, next)=>{
  try {
    const {userInstance} = req;
    const tasks = await userInstance.getTasks();
    res.status(200).send({data: tasks});
  } catch (error) {
    next(error)
  }
}

module.exports.deleteTask = async(req, res, next) => {
  try {
    const {task} = req;
    await task.destroy();
    res.status(200).send({data:{task}});
  } catch (error) {
    next(error)
  }
}

module.exports.updateTask = async(req, res, next) => {
  try {
    const {task, body:{values}} = req;
    await task.update(values, {
        returning:true
      });
    res.status(200).send({data:{task}});
  } catch (error) {
    next(error)
  }
}
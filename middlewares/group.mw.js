const createError = require('http-errors');
const {Group} = require('../models');

module.exports.checkGroup = async (req, res, next)=>{
  try {
    const {params:{groupId}} = req;
    const groupInstance = await Group.findByPk(groupId)
    if(!groupInstance){
      const error = createError(404, 'Group not found');
      return next(error);
    }
    req.groupInstance = groupInstance;
    next()
  } catch (error) {
    next(error)
  }
}


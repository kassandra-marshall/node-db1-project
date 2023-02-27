const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if(req.body.name === undefined || req.body.budget === undefined){
    next({ status: 400, message: 'name and budget are required' })    
  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100){
      next({ status: 400, message: 'name of account must be between 3 and 100' })
  } else if (!parseInt(req.body.budget)){
    next({ status: 400, message: 'budget of account must be a number' })
  } else if (parseInt(req.body.budget) < 0 || parseInt(req.body.budget) > 1000000){
    next({ status: 400, message: 'budget of account is too large or too small' })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await db('accounts').where('name', req.body.name).first()
    if(existing){
      next({ status: 400, message: 'that name is taken' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }

}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await db('accounts').where('id', req.params.id).first()
  if (!account){
    next({ status: 404, message: 'account not found'})
  } else {
    next()
  }
}

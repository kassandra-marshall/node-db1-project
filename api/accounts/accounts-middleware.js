const db = require('../../data/db-config');
const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  const error = { status: 400 }
  if(name === undefined || budget === undefined){
    error.message= 'name and budget are required'     
  } else if (name.trim().length < 3 || name.trim().length > 100){
    error.message= 'name of account must be between 3 and 100' 
  } else if (!parseInt(budget)){
    error.message= 'budget of account must be a number' 
  } else if (parseInt(budget) < 0 || parseInt(budget) > 1000000){
    // typeof budget !== 'number' || isNaN(budget)
    error.message= 'budget of account is too large or too small' 
  } 
  if (error.message){
    next(error)
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await db('accounts').where('name', req.body.name.trim()).first()
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
  try {
    const account = await db('accounts').where('id', req.params.id).first()
    if (!account){
      next({ status: 404, message: 'account not found'})
    } else {
      req.account = account
      next()
    }
  } catch (error) {
    next(error)
  }
}

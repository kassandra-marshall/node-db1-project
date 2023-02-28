const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC 
  return db('accounts')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first()
}

const create = async (account) => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  return getById(id)
   
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').update(account).where('id', id)
  const result = await getById(id)
  return result
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const toBeDeleted = await getById(id)
  await db('accounts').del().where('id', id)
  return toBeDeleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

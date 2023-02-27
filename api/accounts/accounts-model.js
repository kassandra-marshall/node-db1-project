const db = require('../../data/db-config');

const getAll = async () => {
  // DO YOUR MAGIC
  const result = await db('accounts')
  return result
}

const getById = async (id) => {
  // DO YOUR MAGIC
  const result = await db('accounts').where('id', id).first()
  return result
}

const create = async (account) => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  const result = await getById(id)
  return result
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

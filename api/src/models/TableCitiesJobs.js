export default (sequelizeInstance, Model) => {
  Model.sync = async (data) => {
    const dataToSync = data
      .map((row) => {
        const [insee_code, rome_id, number] = row
        return {
          insee_code: parseInt(insee_code, 10),
          rome_id,
          number: parseInt(number, 10),
        }
      })
      .filter(
        ({ insee_code, rome_id, number }) =>
          !Number.isNaN(insee_code) && rome_id && !Number.isNaN(number)
      )
    await Model.destroy({ truncate: true })
    await Model.bulkCreate(dataToSync)
  }

  return Model
}

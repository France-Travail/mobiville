export default (sequelizeInstance, Model) => {
  Model.sync = async (data) => {
    const dataToSync = data
      .map((row) => {
        const [bassin_id, , rome_id, number] = row
        return { bassin_id, rome_id, number }
      })
      .filter(
        ({ bassin_id, rome_id, number }) => bassin_id && rome_id && number
      )
    await Model.destroy({ truncate: true })
    await Model.bulkCreate(dataToSync)
  }

  return Model
}

const { StopOver } = require('../models/index')
const { resToSend, res500Error } = require('../Helper/resToSend')

exports.render = async (req, res) => {
  try {
    const { trip } = req.params
    const stopOvers = await StopOver.findAll({ where: { trip } })
    res
      .status(200)
      .json({
        response: {
          status: 'success',
          data: { message: '', payload: stopOvers },
        },
      })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

exports.create = async (req, res) => {
  try {
    const { trip, stopDate, station } = req.body
    const stopOver = await StopOver.create({ trip, stopDate, station })
    res
      .status(201)
      .json({
        response: {
          status: 'success',
          data: { message: 'escale Ajouter avec succès', payload: stopOver },
        },
      })
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res
        .status(400)
        .json({ response: { status: 'failed', data: error.errors } })
    }
    console.log(error)
    res
      .status(500)
      .json({
        response: {
          status: 'failed',
          data: "une erreur s'est produite veuillez contacter l'admin",
        },
      })
  }
}

exports.remove = async (req, res) => {
  try {
    const { id } = req.params
    const affectedRowsCount = await StopOver.destroy({ where: { id } })
    res
      .status(200)
      .json({
        response: {
          status: 'success',
          data: {
            message: 'Opération effectuer avec succès',
            payload: affectedRowsCount,
          },
        },
      })
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({
        response: {
          status: 'failed',
          data: "une erreur s'est produite veuillez contacter l'admin",
        },
      })
  }
}

exports.update = async (req, res) => {
  try {
    const { id } = req.params
    const { stopDate, station } = req.body
    const stopOverToUpdate = await StopOver.findByPk(id)
    let fieldsToEscape = []
    if (station && stopOverToUpdate.station !== station) {
      stopOverToUpdate.station = station
    } else {
      fieldsToEscape.push('differentStations')
    }
    if (
      stopDate &&
      stopOverToUpdate.stopDate.getTime() !== new Date(stopDate).getTime()
    ) {
      stopOverToUpdate.stopDate = stopDate
    } else {
      fieldsToEscape.push('differentThanAllStopOvers')
    }

    await stopOverToUpdate.validate({ skip: fieldsToEscape })
    const updatedStopOver = await stopOverToUpdate.save({ validate: false })

    res
      .status(200)
      .json({
        response: {
          status: 'success',
          data: { message: '', payload: updatedStopOver },
        },
      })
  } catch (error) {
    res
      .status(500)
      .json({
        response: {
          status: 'failed',
          data: "une erreur s'est produite veuillez contacter l'admin",
          payload: error,
        },
      })
  }
}

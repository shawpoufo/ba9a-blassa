const { requestValidation } = require('../models/index')
const { resToSend } = require('./resToSend')
//Id validation
const validateId = (idName) => {
  return async (req, res, next) => {
    let { id } = req.params
    if (!id) id = req.body.id
    const model = requestValidation.build({ id })
    model
      .validate()
      .then((succes) => next())
      .catch((error) =>
        res
          .status(400)
          .json(
            resToSend(
              'failed',
              `${idName} incorrecte ${error.errors[0].message}`
            )
          )
      )
  }
}
module.exports = {
  validateId,
}

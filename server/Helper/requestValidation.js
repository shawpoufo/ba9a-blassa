const { requestValidation } = require('../models/index')
//Id validation
const validateId = (idName) => {
    return async (req, res, next) => {
        const { id } = req.params
        const model = requestValidation.build({ id })
        model.validate()
            .then(succes => next())
            .catch(error => res.status(400).json({ response: { status: 'failed', data: { message: `${idName} incorrecte`, payload: error } } }))
    }
}
module.exports = {
    validateId
}
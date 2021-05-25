const resToSend = (message, objRes, other) => {
  return { message, payload: objRes, ...other }
}
const res500Error = () => ({
  message: "une erreur s'est produite contacter ladmin",
})
module.exports = { resToSend, res500Error }

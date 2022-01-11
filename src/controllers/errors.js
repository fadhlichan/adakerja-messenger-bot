exports.notFound = (req, res) => {
    res.status(404).send('Not Found')
}

exports.internalServerError = (err, req, res, next) => {
    res.status(500).send(err)
}
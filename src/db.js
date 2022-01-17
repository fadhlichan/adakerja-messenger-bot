const mongoose = require('mongoose')

module.exports.connect = async (uri) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports.close = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
}

module.exports.clear = async () => {
    const collections = mongoose.connection.collections
    for (let key in collections) {
        const collection = collections[key]
        await collection.deleteMany()
    }
}
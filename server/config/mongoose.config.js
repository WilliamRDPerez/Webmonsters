const mongoose = require("mongoose");


mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established connection to ${process.env.DB_NAME}!`))
    .catch(err => console.log(`You in fact, could not connect to ${process.env.DB_NAME}`, err));
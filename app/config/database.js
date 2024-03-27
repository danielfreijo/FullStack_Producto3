const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DB_connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
    };
};

// Define the User schema
let userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.methods.checkPassword = function (password) {
    return this.password === password; // Simple implementation for demo purposes only
}

let User = mongoose.model("User", userSchema);

module.exports = {
    db: mongoose.connection,
    User: User,
    DB_connect: DB_connect
};
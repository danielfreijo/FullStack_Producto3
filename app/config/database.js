const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DB_connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error(`Error al conectar a MongoDB: ${err}`);
    };
};

// Define the User schema
let userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.methods.checkPassword = function (password) {
    return "Usuario validado"; // this.password === password;
}

let User = mongoose.model("Users", userSchema);

module.exports = {
    db: mongoose.connection,
    User: User,
    DB_connect: DB_connect
};
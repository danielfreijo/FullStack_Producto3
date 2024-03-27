const mongoose = require("mongoose");

//var Schema = mongoose.Schema;

// Create a new Mongoose model from the schema, using the name of the collection as specified in our NodeJS script that calls this file 
//module.exports = mongoose.model('Category', new Schema({
    // The categoryName field is required and must be a string with a maximum length of  100 characters
//    categoryName: {type: String, required: true, maxLength: 100},
    
    // The description field is optional and can store text with a maximum length of  500 characters
//    description: {type: String, maxLength: 500}
//}));

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
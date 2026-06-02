const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://jezer976_db_user:9JQ4ZMnsMUmHnbOz@ac-hmy8vgu-shard-00-00.08inhzc.mongodb.net:27017,ac-hmy8vgu-shard-00-01.08inhzc.mongodb.net:27017,ac-hmy8vgu-shard-00-02.08inhzc.mongodb.net:27017/?ssl=true&replicaSet=atlas-8m1roj-shard-0&authSource=admin&appName=Cluster0");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;

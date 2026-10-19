const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

function atlasHost(uri) {
  try {
    return new URL(uri.replace("mongodb+srv://", "https://")).host;
  } catch {
    return "MongoDB Atlas";
  }
}

async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing in backend/.env");
  }
  if (!uri.startsWith("mongodb+srv://") && !uri.includes("mongodb.net")) {
    throw new Error("Set MONGODB_URI to your MongoDB Atlas connection string");
  }

  await mongoose.connect(uri, {
    dbName: "dsa_tracker",
    serverSelectionTimeoutMS: 20000,
  });

  console.log("MongoDB Atlas connected:", atlasHost(uri), "db:", mongoose.connection.name);
}

module.exports = { connectDb };

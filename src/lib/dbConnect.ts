import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed", error);

    process.exit();
  }
}

export default dbConnect;

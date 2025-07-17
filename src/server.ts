import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
// import { envVars } from "./config/env";
const PORT = process.env.PORT || 4000;
let server: Server;
const startServer = async () => {
  try {
   await mongoose.connect("mongodb://Tour_Ph:lm5LjeZm25OhL2yB@ac-cgkxfia-shard-00-00.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-01.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-02.x9t7sgg.mongodb.net:27017/tour-db?ssl=true&replicaSet=atlas-nszs70-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");
   console.log('CONNTED WITH DB!!!')
    server = app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`server lising prot 4000`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
startServer();

// Error Handling below

process.on("SIGTERM", () => {
  // eslint-disable-next-line no-console
  console.log("SIGTERM detectd ... server shutting dowun",);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
});
process.on("SIGINT", () => {
  // eslint-disable-next-line no-console
  console.log("SIGINT detectd ... server shutting dowun",);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
});
process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.log("unhandledRejection detectd ... server shutting dowun",err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
});
process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("uncaughtException detectd ... server shutting dowun",err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
});


// unhandledRejection error
// Promise.reject(new Error(" I forger to cahsh"))
// uncaughtException error
// throw new Error ("I foger to handel this lcoal error")

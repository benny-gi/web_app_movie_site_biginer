import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongo_uri = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;

MongoClient.connect(
  mongo_uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  }
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });

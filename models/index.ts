//

import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PASS}@cluster0.kkr6dpm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function tryConnection() {
  try {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();
    console.log(databasesList);
    if (databasesList) console.log("Database: Successfully connected!");
    else console.log("Database: No databases found!");
  } catch (e) {
    console.log("Database: Connection error : ", e);
  }
}

tryConnection();

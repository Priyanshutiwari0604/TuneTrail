// npm dependencies
import { MongoClient, ObjectId } from "mongodb";

const { DB_NAME, SUCCESS, SERVER_ERR } = process.env;
const URI_TO_CONNECT_MONGODB = <string>process.env.URI_TO_CONNECT_MONGODB;
const COLLECTION_MUSIC = <string>process.env.COLLECTION_MUSIC;

const createConnectionToDB = () => {
  return new MongoClient(URI_TO_CONNECT_MONGODB);
};

const closeConnectionToDB = async (dbClient: MongoClient) => {
  await dbClient.close();
};

const selectDB = (dbClient: MongoClient, dbName = DB_NAME) => {
  return dbClient.db(dbName);
};

const convertToObjectId = (strId: string) => new ObjectId(strId);

export {
  createConnectionToDB,
  closeConnectionToDB,
  selectDB,
  convertToObjectId,
};

// 🧪 TEMP FUNCTION to print all documents from the 'musics' collection
const printCollectionDetails = async () => {
  const client = createConnectionToDB();

  try {
    await client.connect(); // make sure connection is established
    const db = selectDB(client);
    const collection = db.collection(COLLECTION_MUSIC);
    const docs = await collection.find({}).toArray();
    console.log("🎵 All songs in collection:", docs);
  } catch (error) {
    console.error("❌ Error fetching collection details:", error);
  } finally {
    await closeConnectionToDB(client);
  }
};

// Call it if this file is run directly with: `ts-node dbHelper.ts`
if (require.main === module) {
  printCollectionDetails();
}

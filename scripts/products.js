const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://pdls-admin:iamp-M3l1@sdp-cluster.wlujo.mongodb.net/sdp-test?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sdp-test");
    const products = database.collection("products");

    products.updateMany( 
      { }, 
      { $rename: { "companyId": "company" } } 
    )
  } finally {
    // await client.close();
    console.log('resy')
  }
}
run().catch(console.error);

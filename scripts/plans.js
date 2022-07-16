const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://pdls-admin:iamp-M3l1@sdp-cluster.wlujo.mongodb.net/sdp-test?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function rename() {
  try {
    await client.connect();

    const database = client.db("sdp-test");
    const products = database.collection("baseplans");

    products.updateMany( 
      { }, 
      { $rename: { "productId": "product" } } 
    )
  } finally {
    // await client.close();
    console.log('resy')
  }
}

rename().catch(console.error);

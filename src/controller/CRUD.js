// VIEW DATA
async function viewData(db, collectionName) {
    const collection = db.collection(collectionName);
    const data = await collection.find().toArray();
  
    return data;
  }


  // UPDATE
  async function updateOneDataAndReturn(client, collectionName, id, dataUpdate) {
    const collection = client.collection(collectionName);
  
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: dataUpdate }
    );
  
    const resultFinal = await collection.findOne({ _id: new ObjectId(id) });
  
    if (result) {
      console.log("new Data from Update : ", resultFinal);
      return resultFinal;
    } else {
      console.log("Đéo có data");
    }
  
    return result.value;
  }

  // FIND

async function findOneName(client, collectionName, Name) {
  try {
    const collection = client.collection(collectionName);

    const result = await collection.findOne({ name: Name });

    if (result) {
      console.log("Yes from findOneName");
      return result;
    } else {
      console.log("No from findOneName");
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

async function findById(client, collectionName, id) {
  try {
    const collection = client.collection(collectionName);

    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (result) {
      console.log("Yes from findOneById");
      return result;
    } else {
      console.log("No from findOneById");
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

  module.exports = {
    viewData,
    updateOneDataAndReturn,
    findOneName, 
    findById

  };
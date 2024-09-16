import typesenseClient from "@/lib/typesense/typesenseClient";

export async function addData({ collectionName, documentData }) {
  try {
    const document = await typesenseClient
      .collections(collectionName)
      .documents()
      .create({
        id: documentData.id,
        ...documentData,
      });
    console.log(`Document added successfully to ${collectionName}:`, document);
    return document;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw new Error(error.message);
  }
}

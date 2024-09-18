import typesenseClient from "@/lib/typesense/typesenseClient";

export async function updateData({ collectionName, documentData }) {
  try {
    const document = await typesenseClient
      .collections(collectionName)
      .documents(documentData.id)
      .update({
        ...documentData,
      });
    console.log(
      `Document updated successfully in ${collectionName}:`,
      document,
    );
    return document;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw new Error(error.message);
  }
}

import typesenseClient from "@/lib/typesense/typesenseClient";

export async function deleteData({ collectionName, documentId }) {
  try {
    const document = await typesenseClient
      .collections(collectionName)
      .documents(documentId)
      .delete();
    console.log(
      `Document deleted successfully from ${collectionName}:`,
      document,
    );
    return document;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw new Error(error.message);
  }
}

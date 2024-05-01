"use client";
import { ref, deleteObject, getStorage } from "firebase/storage";
export const deleteFileOnZodError = async (downloadURL: string | null) => {
  if (!downloadURL) {
    return;
  }

  const storage = getStorage();
  const fileRef = ref(storage, downloadURL);

  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

import localforage from "localforage";
export const addFileToStorage = async (file: any) => {
  await localforage.getItem("files").then(async (files: any) => {
    const store = files ? [...files, file] : [file];
    await localforage.setItem("files", store);
  });
};

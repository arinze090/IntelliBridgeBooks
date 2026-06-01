const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

export const uploadBookCoversToCloudinary = async (file) => {
  if (!file) {
    console.error("No file provided for upload.");
    return null;
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "legacybridge/books/bookscover");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    // console.log("data", data);

    return data;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
  }
};

export const uploadBookFilesToCloudinary = async (file) => {
  if (!file) {
    console.error("No file provided for upload.");
    return null;
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  formData.append("folder", "legacybridge/books/booksfiles");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    // console.log("uploadBookFilesToCloudinary data", data);

    return data;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
  }
};

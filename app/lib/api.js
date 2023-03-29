export async function postImageToAPI(imageFile, apiURL) {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(apiURL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error posting image:", error);
    return null;
  }
}

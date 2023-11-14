// api.js
import axios from "axios";

// const apiKey = "40531611-c718006264cffa07f6ed617b2";
// const perPage = 40;

// export async function searchImagesByQuery(query, pageNumber = 1) {
//   const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`;

//   try {
//     const response = await axios.get(url);
//     if (response.data && response.data.hits) {
//       return response.data;
//     } else {
//       throw new Error("Invalid response format from the Pixabay API.");
//     }
//   } catch (error) {
//     console.error("Error during API request:", error);
//     throw new Error("Failed to fetch images. Please try again later.");
//   }
// }
export async function searchImagesByQuery(query, pageNumber = 1) {
  const apiKey = "40531611-c718006264cffa07f6ed617b2";
  const perPage = 40;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}
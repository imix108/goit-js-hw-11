import axios from "axios";

const apiKey = "40531611-c718006264cffa07f6ed617b2";
const perPage = 40;

export async function searchImagesByQuery(query, pageNumber = 1) {
 
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

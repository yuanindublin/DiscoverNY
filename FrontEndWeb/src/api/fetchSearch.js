import axios from "axios";

async function fetchSearch({ queryKey }) {
  const { category } = queryKey[1];
  try {
    const respnose = await axios.get(`http://127.0.0.1:8000/api/POIs/tag/`);
    const categoryURL = respnose.data[category];
    const res = await axios.get(categoryURL);
    if (!res || !res.data) {
      throw new Error(`poi search not successful for category: ${category}`);
    }

    // return res.json();
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
export default fetchSearch;

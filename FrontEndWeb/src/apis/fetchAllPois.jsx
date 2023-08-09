import axios from "axios";

async function fetchAllPois({ queryKey }) {
  const { time } = queryKey[1];
  try {
    const apiRes = await axios.get(
      `http://127.0.0.1:8000/api/POIs/?time_index=${time}`
    );
    if (!apiRes || !apiRes.data) {
      console.log("Fetch all pois Error");
      throw new Error(`Fetch all pois prediction not ok`);
    }
    console.log("Fetch all pois prediction OK");
    return apiRes.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export default fetchAllPois;

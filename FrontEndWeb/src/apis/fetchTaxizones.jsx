import axios from "axios";

async function fetchTaxizones({ queryKey }) {
  const { time } = queryKey[1];
  try {
    const apiRes = await axios.get(
      `http://127.0.0.1:8000/api/taxizones/?time_index=${time}`
    );
    if (!apiRes || !apiRes.data) {
      console.log("Fetch taxizones Error");
      throw new Error(`Fetch taxizones prediction not ok`);
    }
    console.log("Fetch taxizones prediction OK");
    return apiRes.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
export default fetchTaxizones;

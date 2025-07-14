import summaryApi from "../comman/SummaryApi";
import axios from "axios";
export const fetchUserDetails = async () => {
  try {
    const response = await axios[summaryApi.UserDetails.method](
      summaryApi.UserDetails.url, { withCredentials: true }
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};

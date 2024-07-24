import axios from "axios";

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(`Server error: ${error.response.data}`);
      alert("Server error occurred.");
    } else if (error.request) {
      console.error("Network error occurred.");
      alert("Network error occurred.");
    } else {
      console.error("Unexpected error occurred.");
      alert("Unexpected error occurred.");
    }
  } else {
    console.error("Non-Axios error occurred:", error);
  }
};

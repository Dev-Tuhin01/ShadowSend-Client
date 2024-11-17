import { useState } from "react";
const useGetSix = () => {
  const [userViews, setUserViews] = useState([]);
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);

  const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Adjust as per your storage logic
  };

   const fetchFirstSix = async () => {
    setError("");
    setUserViews([]);

    const authToken = getAuthToken();

    if (!authToken) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    try {
      const response = await fetch("/findfirstsix", {
        method: "GET",
        headers: {
          Authorization:` Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 204) {
          setError("No content found.");
        } else {
          throw new Error("An error occurred while fetching the data.");
        }
        return;
      }

      const data = await response.json();
      setUserViews(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching the data.");
      console.log(err.message && error);
    }

    return userViews;
  }
  return {loading,fetchFirstSix};
}

export default useGetSix;

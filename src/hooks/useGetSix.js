import { useState, useCallback } from "react";

const useGetSix = () => {
  const [userViews, setUserViews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Adjust as per your storage logic
  };

  // Use useCallback to memoize fetchFirstSix and avoid infinite rerender
  const fetchFirstSix = useCallback(async () => {
    setError(""); // Clear previous errors
    setUserViews([]); // Clear previous data
    setLoading(true); // Set loading state to true

    const authToken = getAuthToken();

    if (!authToken) {
      setError("Authorization token is missing. Please log in.");
      setLoading(false); // Set loading state to false when error occurs
      return;
    }

    try {
      const response = await fetch("/findfirstsix", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 204) {
          setError("No content found.");
        } else {
          throw new Error("An error occurred while fetching the data.");
        }
        setLoading(false); // Set loading state to false when error occurs
        return;
      }

      const data = await response.json();
      setUserViews(data); // Update state with fetched data
    } catch (err) {
      setError(err.message || "An error occurred while fetching the data.");
    } finally {
      setLoading(false); // Ensure loading state is set to false after request finishes
    }
  }, []); // Empty dependency array ensures fetchFirstSix is memoized

  return { userViews, error, loading, fetchFirstSix };
};

export default useGetSix;


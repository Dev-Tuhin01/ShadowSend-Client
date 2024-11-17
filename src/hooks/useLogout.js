import {  useState } from "react";
import { useUserContext } from "../Context/userContext.js";
import Swal from "sweetalert2";

const useLogout = () => {
  const [loading,setLoading] = useState(false);
  const {setUser} = useUserContext();
  

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Retrieve the authToken from localStorage or another secure place
  const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Adjust as per your storage logic
  };

 const logout = async () => {
  setMessage('');
  setError('');

  const authToken = getAuthToken();

  if (!authToken) {
    setError('Authorization token is missing. Please log in first.');
    return;
  }

  try {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Check if response body exists and is a valid JSON
      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        console.error("Error parsing JSON:", err);
        setError("Failed to parse logout response.");
        return;
      }

      // Clear token from localStorage after logout
      localStorage.removeItem('authToken');
      setUser(null);  // Reset user state
      Swal.fire({
        icon: 'success',
        title: 'Logged Out!',
        text: data.message || 'Logout successful.',
        confirmButtonText: 'Okay'
      });
    } else {
      // Handle non-OK responses
      const errorData = await response.json().catch(err => {
        console.error("Error parsing JSON:", err);
        return {}; // Return empty object if JSON parsing fails
      });
      setError(errorData.message || 'Logout failed. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed!',
        text: error || 'An error occurred. Please try again.',
        confirmButtonText: 'Okay'
      });
    }
  } catch (_err) {
    setError('An error occurred during logout. Please try again.');
    Swal.fire({
      icon: 'error',
      title: 'Logout Error',
      text: 'An error occurred during logout. Please try again.',
      confirmButtonText: 'Okay'
    });
  }
};

  return {loading , logout}
}

export default useLogout;


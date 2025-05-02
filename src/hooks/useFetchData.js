// src/hooks/useFetchData.js
import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url, key) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await axios.get(url, {
          withCredentials: true,
        });

        if (!ignore) {
          setData(res.data.stats); // accessing the `stats` object from your backend
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Something went wrong");
          setData(null);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true; // cleanup for component unmount
    };
  }, [url, key]);

  return { loading, data, error };
};

export default useFetchData;

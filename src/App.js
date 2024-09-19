import React, { useEffect, useState } from "react";

export default function App() {
  const [flag, setFlag] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlag = async () => {
      const response = await fetch(
        "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/707261"
      );
      const data = await response.text();
      setLoading(false);
      setFlag(data.split(""));
    };
    fetchFlag();
  }, []);

  const [displayedFlag, setDisplayedFlag] = useState([]);
  useEffect(() => {
    if (!loading && flag.length > 0) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        setDisplayedFlag((prev) => [...prev, flag[currentIndex]]);
        currentIndex++;
        if (currentIndex === flag.length) clearInterval(intervalId);
      }, 500);
    }
  }, [flag, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {displayedFlag.map((char, index) => (
        <li key={index}>{char}</li>
      ))}
    </ul>
  );
}

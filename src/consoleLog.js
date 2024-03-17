import React, { useState, useRef, useEffect } from "react";

const CatFactFetcher = () => {
  const [fact, setFact] = useState("");
  const inputRef = useRef(null);

  const fetchCatFact = async () => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    }
  };

  useEffect(() => {
    if (fact && inputRef.current) {
      const firstWordIndex = fact.indexOf(" ");
      if (firstWordIndex !== -1) {
        setTimeout(() => {
          inputRef.current.setSelectionRange(
            firstWordIndex + 1,
            firstWordIndex + 1
          );
        }, 0);
      }
    }
  }, [fact]);

  return (
    <div>
      <button onClick={fetchCatFact}>Get Cat Fact</button>
      <input type="text" value={fact} ref={inputRef} />
    </div>
  );
};

export default CatFactFetcher;

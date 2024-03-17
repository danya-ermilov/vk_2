import React, { useState, useEffect } from "react";

const AgeForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [lastRequest, setLastRequest] = useState("");
  const [controller, setController] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z]+$/.test(name)) {
      alert("Имя должно состоять только из латинских букв!");
      return;
    }
    fetchAge(name);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setName(value);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      fetchAge(value);
    }, 3000);
    setTimer(newTimer);
  };

  const fetchAge = (nameValue) => {
    if (nameValue === lastRequest || loading) {
      return;
    }

    setLastRequest(nameValue);

    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);

    fetch(`https://api.agify.io?name=${nameValue}`, {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setAge(data.age);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error:", error);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      {loading ? <p>Loading...</p> : age && <p>Age: {age}</p>}
    </div>
  );
};

export default AgeForm;

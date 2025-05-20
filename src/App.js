import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!word.trim()) {
      setError("Please enter a word to search.");
      setResult(null);
      return;
    }

    setError("");
    setResult("loading");

    try {
      const response = await fetch(
        `https://api.shecodes.io/dictionary/v1/define?word=${word}`
      );
      if (!response.ok) throw new Error("Word not found or invalid request.");

      const data = await response.json();
      if (data.definitions && data.definitions.length > 0) {
        setResult({
          word: data.word,
          partOfSpeech: data.definitions[0].partOfSpeech || "N/A",
          definition: data.definitions[0].definition,
        });
      } else {
        setError("No definition found for this word.");
        setResult(null);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setResult(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="app">
      <div className="bubble-container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`bubble bubble${i + 1}`} />
        ))}
      </div>
      <div className="container">
        <h1>Dictionary App</h1>
        <input
          type="text"
          placeholder="Search for a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
        <div className="results">
          {error && <p className="error">{error}</p>}
          {result === "loading" && <p>Loading...</p>}
          {result && result !== "loading" && (
            <>
              <h2>{result.word}</h2>
              <p className="part-of-speech">{result.partOfSpeech}</p>
              <p className="definition">{result.definition}</p>
            </>
          )}
        </div>
      </div>
      <footer>
        <p>Made with ❤️ by <strong>Tori</strong></p>
      </footer>
    </div>
  );
}

export default App;



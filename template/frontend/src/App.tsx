import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import { addCounter, loadCounters } from "./api/counter";
import "./App.css";

interface CounterData {
  _id: string;
  name: string;
  value: number;
}

function CounterList() {
  const [counters, setCounters] = useState<CounterData[]>([]);
  const [counterName, setCounterName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.text())
      .then((data) => {
        console.log("CORS test result:", data);
      })
      .catch((err) => {
        console.error("CORS test failed as expected:", err);
      });
    loadCounters().then(setCounters);
  }, []);

  const handleAddCounter = async () => {
    if (!counterName.trim()) return;

    const newCounter = await addCounter(counterName);

    setCounters((prev) => [...prev, newCounter]);
    setCounterName("");
  };

  return (
    <main>
      <h1>Counter App</h1>

      <div className="container">
        {counters.map((counter) => (
          <Counter
            key={counter._id}
            id={counter._id}
            name={counter.name}
            initial={counter.value}
            onDelete={(id) =>
              setCounters((prev) => prev.filter((c) => c._id !== id))
            }
          />
        ))}
      </div>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="New counter name"
          value={counterName}
          onChange={(e) => setCounterName(e.target.value)}
        />
        <button onClick={handleAddCounter}>Add Counter</button>
      </div>
    </main>
  );
}

export default CounterList;

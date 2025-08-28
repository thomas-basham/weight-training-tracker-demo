import { useState, useEffect } from "react";
import { listAllItems, createItem } from "../utils/dynamo";

export default function Main() {
  const [trainingRecords, setTrainingRecords] = useState([]);

  useEffect(() => {
    const handleGetRecords = async () => {
      const items = await listAllItems("TrainingRecord");

      setTrainingRecords(items);
    };

    handleGetRecords();
  }, []);

  const handleCreateRecord = async (event) => {
    event.preventDefault();

    
    const newTrainingRecord = {
      id: Date.now().toString(), 
      sets: event.target.sets.value,
      reps: event.target.reps.value,
      weight: event.target.weight.value,
    };

    await createItem("TrainingRecord", newTrainingRecord);

    setTrainingRecords((oldTrainingRecords) => [
      ...oldTrainingRecords,
      newTrainingRecord,
    ]);
  };

  return (
    <main>
      <section>
        <form onSubmit={(event) => handleCreateRecord(event)}>
          <label htmlFor="sets">Sets</label>
          <input type="number" name="sets" id="setsInput" />
          <br />
          <label htmlFor="reps">Reps</label>
          <input type="number" name="reps" id="repsInput" />
          <br />
          <label htmlFor="weight">Weight</label>
          <input type="number" name="weight" id="weightInput" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>

      <section>
        <h2>Recorded Results</h2>

        {trainingRecords.map((record, index) => {
          return (
            <div className="training-record-div" key={index}>
              <div>
                <h3>Sets</h3>
                <p>{record.sets}</p>
              </div>
              <div>
                <h3>Reps</h3>
                <p>{record.reps}</p>
              </div>

              <div>
                <h3>Weight</h3>
                <p>{record.weight}</p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

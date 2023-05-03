import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodJob = () => setGood(good + 1);
  const neutralJob = () => setNeutral(neutral + 1);
  const badJob = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={goodJob}>good</button>
      <button onClick={neutralJob}>neutral</button>
      <button onClick={badJob}>bad</button>

      <h1>statistics</h1>

      <div>
        <strong>good</strong> {good}
      </div>
      <div>
        <strong>neutral</strong> {neutral}
      </div>
      <div>
        <strong>bad</strong> {bad}
      </div>
    </div>
  );
};

export default App;

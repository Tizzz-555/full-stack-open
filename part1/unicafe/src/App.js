import { useState } from "react";

// a proper place to define a component
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    // ...
    <>
      <div>
        <strong>good </strong>
        {good}
      </div>
      <div>
        <strong>neutral </strong>
        {neutral}
      </div>
      <div>
        <strong>bad </strong>
        {bad}
      </div>
      <div>
        <strong>all </strong>
        {all}
      </div>
      <div>
        <strong>average </strong>
        {average}
      </div>
      <div>
        <strong>positive </strong>
        {positive}
      </div>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodJob = () => setGood(good + 1);
  const neutralJob = () => setNeutral(neutral + 1);
  const badJob = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100 + "%";

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={goodJob} text="good" />
      <Button handleClick={neutralJob} text="neutral" />
      <Button handleClick={badJob} text="bad" />

      <h1>statistics</h1>
      <div>
        <Statistics
          good={good}
          neutral={good}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      </div>
    </div>
  );
};

export default App;

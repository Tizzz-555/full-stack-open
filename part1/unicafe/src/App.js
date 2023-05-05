import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const goodJob = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);

    const updatedAll = updatedGood + neutral + bad;
    setAll(updatedAll);

    const updatedAverage = (updatedGood - bad) / updatedAll;
    setAverage(updatedAverage);

    const updatedPercentage = (updatedGood / updatedAll) * 100;

    console.log(updatedGood / updatedAll);
    setPercentage(updatedPercentage);
  };

  const neutralJob = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);

    const updatedAll = updatedNeutral + good + bad;
    setAll(updatedAll);

    const updatedAverage = (good - bad) / updatedAll;
    setAverage(updatedAverage);

    const updatedPercentage = (good / updatedAll) * 100;
    setPercentage(updatedPercentage);
  };

  const badJob = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);

    const updatedAll = updatedBad + neutral + good;
    setAll(updatedAll);

    const updatedAverage = (good - updatedBad) / updatedAll;
    setAverage(updatedAverage);

    const updatedPercentage = (good / updatedAll) * 100;
    setPercentage(updatedPercentage);
  };

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
      <div>
        <strong>all</strong> {all}
      </div>
      <div>
        <strong>average</strong> {average}
      </div>
      <div>
        <strong>positive</strong> {percentage} %
      </div>
    </div>
  );
};

export default App;

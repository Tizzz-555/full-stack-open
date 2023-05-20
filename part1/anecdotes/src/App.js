import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const AOD = ({ voted, anecdotes, selected }) => {
  return (
    <>
      <div>{anecdotes[selected]}</div>
      <p>
        <em>Has {voted[selected]} votes</em>
      </p>
    </>
  );
};

const MVA = ({ voted, anecdotes }) => {
  let i = voted.indexOf(Math.max(...voted));
  return (
    <>
      <div>{anecdotes[i]}</div>
      <p>
        <em>Has {voted[i]} votes</em>
      </p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const randomQuote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteQuote = () => {
    const updatedVoted = [...voted];
    updatedVoted[selected] += 1;
    setVoted(updatedVoted);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <AOD voted={voted} anecdotes={anecdotes} selected={selected}></AOD>
      <Button handleClick={voteQuote} text="vote"></Button>
      <Button handleClick={randomQuote} text="next anecdote"></Button>
      <h1>Anecdote with most votes</h1>
      <MVA voted={voted} anecdotes={anecdotes}></MVA>
    </>
  );
};

export default App;

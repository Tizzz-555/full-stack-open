import { useState } from "react";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
	const padding = {
		paddingRight: 5,
	};
	return (
		<div>
			<Link style={padding} to="/">
				anecdotes
			</Link>
			<Link style={padding} to="/create">
				create new
			</Link>

			<a href="#" style={padding}>
				about
			</a>
		</div>
	);
};

const Anecdote = ({ anecdote }) => {
	return (
		<div>
			<h2>{anecdote.content}</h2>
			<div>has {anecdote.votes} votes</div>
			<div>
				for more info see <a href={anecdote.info}>{anecdote.info}</a>
			</div>
		</div>
	);
};

const AnecdoteList = ({ anecdotes }) => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<ul>
				{anecdotes.map((anecdote) => (
					<li key={anecdote.id}>
						<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
// const About = () => (
// 	<div>
// 		<h2>About anecdote app</h2>
// 		<p>According to Wikipedia:</p>

// 		<em>
// 			An anecdote is a brief, revealing account of an individual person or an
// 			incident. Occasionally humorous, anecdotes differ from jokes because their
// 			primary purpose is not simply to provoke laughter but to reveal a truth
// 			more general than the brief tale itself, such as to characterize a person
// 			by delineating a specific quirk or trait, to communicate an abstract idea
// 			about a person, place, or thing through the concrete details of a short
// 			narrative. An anecdote is "a story with a point."
// 		</em>

// 		<p>
// 			Software engineering is full of excellent anecdotes, at this app you can
// 			find the best and add more.
// 		</p>
// 	</div>
// );

const Footer = () => (
	<div>
		Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
		See{" "}
		<a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
			https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
		</a>{" "}
		for the source code.
	</div>
);

const CreateNew = (props) => {
	const navigate = useNavigate();
	const { addNew, content, author, info } = props;

	const handleSubmit = (e) => {
		e.preventDefault();
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
		navigate("/");
	};

	const resetAll = () => {
		content.reset();
		author.reset();
		info.reset();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content.inputProps} />
				</div>
				<div>
					author
					<input {...author.inputProps} />
				</div>
				<div>
					url for more info
					<input {...info.inputProps} />
				</div>
				<button type="submit">create</button>
				<button type="reset" onClick={resetAll}>
					reset
				</button>
			</form>
		</div>
	);
};

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: "If it hurts, do it more often",
			author: "Jez Humble",
			info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
			votes: 0,
			id: 1,
		},
		{
			content: "Premature optimization is the root of all evil",
			author: "Donald Knuth",
			info: "http://wiki.c2.com/?PrematureOptimization",
			votes: 0,
			id: 2,
		},
	]);

	const content = useField("text");
	const author = useField("text");
	const info = useField("text");

	const [notification, setNotification] = useState("");

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000);
		setAnecdotes(anecdotes.concat(anecdote));
		setNotification(`a new anecdote ${anecdote.content} created!`);
		setTimeout(() => {
			setNotification("");
		}, 2000);
	};

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		};

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	const match = useMatch("/anecdotes/:id");

	const anecdote = match
		? anecdotes.find((a) => a.id === Number(match.params.id))
		: null;

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			<div>{notification}</div>

			{/* <About /> */}
			<Routes>
				<Route
					path="/anecdotes/:id"
					element={<Anecdote anecdote={anecdote} />}
				/>
				<Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
				<Route
					path="/create"
					element={
						<>
							<CreateNew
								content={content}
								author={author}
								info={info}
								addNew={addNew}
							/>
						</>
					}
				/>
			</Routes>
			<Footer />
		</div>
	);
};

export default App;

import './App.css';
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setUser } from "./store/user";
import CreateTaskBlock from "./components/CreateTask/CreateTask";
import TaskCardsBlock from './components/TaskCards/TaskCards';
import TaskBlock from './components/Task/Task';
import { getTasks } from './services-api/getTasks';

function App() {

	useEffect(() => {
		if (window.bx24) {
			const bx24 = window.bx24;
			bx24.init(
				window.bx24.callMethod('user.current', {}, function (res) {
					setUser(res.data())
				})
			)
		} else {
			setUser({ ID: "1", NAME: 'Фёдор', LAST_NAME: 'Клочков', SECOND_NAME: 'Викторович' })
		}

	}, []);


	return (
		<div className="app">
			<BrowserRouter  >
				<Header />
				<Routes>
					<Route path="/" element={<TaskCardsBlock />} />
					<Route path="/create_task" element={<CreateTaskBlock />} />
					<Route path="/tasks/:id" element={<TaskBlock />} />
					<Route path="*" element={<h1>404</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

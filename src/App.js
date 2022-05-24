import './App.css';
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setUser } from "./store/user";
import { getWorkers } from './store/workers';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import CreateTaskPage from './components/CreateTaskPage/CreateTaskPage';
import TaskCardsPage from './components/TaskCardsPage/TaskCardsPage';
import TaskPage from './components/TaskPage/TaskPage';

function App() {
	useEffect(() => {
		if (window.bx24) {
			const bx24 = window.bx24;
			bx24.init(
				window.bx24.callMethod('user.current', {}, function (res) {
					setUser(res.data());
				})
			)
		} else {
			setUser({ ID: "211", NAME: 'Евгений', LAST_NAME: 'Страхов', SECOND_NAME: 'Александрович' });
			// 3setUser({ ID: "1", NAME: 'Фёдор', LAST_NAME: 'Клочков', SECOND_NAME: 'Викторович' });
		}
		getWorkers();
	}, []);

	return (
		<div className="app">
			<BrowserRouter >
				<LoadingSpinner />
				<div className='app-header'>
					<Header />
				</div>
				<div className='app-content'>
					<Routes>
						<Route path="/" element={<TaskCardsPage />} />
						<Route path="/create_task" element={<CreateTaskPage />} />
						<Route path="/tasks/:id" element={<TaskPage />} />
						{/* <Route path="*" element={<h1>404</h1>} /> */}
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;

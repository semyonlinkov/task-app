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
					let department = [];

					res.data().UF_DEPARTMENT.forEach(dep => {
						if (dep === 1) department.push('Руководители');
						else if (dep === 3) department.push('Бухгалтерия');
						else if (dep === 15) department.push('Инженерный');
						else if (dep === 47) department.push('ГБР');
						else if (dep === 29) department.push('Дежурная часть');
						else if (dep === 33) department.push('Кадровый');
						else if (dep === 7) department.push('Маркетинг');
						else if (dep === 21) department.push('Учебный центр');
						else if (dep === 23) department.push('Физ охрана');
						else if (dep === 35) department.push('Юридический');
						else if (dep === 13) department.push('Склад');
						else if (dep === 5) department.push('Технический');
					});

					setUser({ ...res.data(), DEPARTMENT: department });
				})
			)
		} else {
			// setUser({ ID: "3353", NAME: 'Семён', LAST_NAME: 'Линьков', SECOND_NAME: 'Эдуардович', DEPARTMENT: ['Инженерный'], UF_DEPARTMENT: [15] });
			setUser({ ID: "3503", NAME: 'Наим', LAST_NAME: 'Шабутдинов', SECOND_NAME: '', DEPARTMENT: ['Инженерный'], UF_DEPARTMENT: [15] });
			// setUser({ ID: "211", NAME: 'Евгений', LAST_NAME: 'Страхов', SECOND_NAME: 'Александрович', DEPARTMENT: ['Инженерный'], UF_DEPARTMENT: [15] });
			// setUser({ ID: "257", NAME: 'Ксения', LAST_NAME: 'Лукова', SECOND_NAME: 'Евгеньевна', DEPARTMENT: ['Маркетинг'], UF_DEPARTMENT: [7] });
			// setUser({ ID: "1", NAME: 'Фёдор', LAST_NAME: 'Клочков', SECOND_NAME: 'Викторович' });
			// setUser({ ID: "87", NAME: 'Кисилев', LAST_NAME: 'Кирилл', SECOND_NAME: 'Владимирович' });
			// setUser({ ID: "59", NAME: 'Ратиева', LAST_NAME: 'Евгения', SECOND_NAME: 'Васильевна' });
			// setUser({ ID: "319", NAME: 'Евгений', LAST_NAME: 'Страхов', SECOND_NAME: 'Александрович' });
			// setUser({ ID: "61", NAME: 'Евгений', LAST_NAME: 'Страхов', SECOND_NAME: 'Александрович' });
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
						<Route path="*" element={<TaskCardsPage />} />
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

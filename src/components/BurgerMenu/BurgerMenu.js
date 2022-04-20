import { slide as Menu } from 'react-burger-menu'
import './BurgerMenu.scss'
import { Link } from "react-router-dom";
import { useStore } from "effector-react";
import { $menuToogle, $nav, changeMenuToogle, setNav } from "../../store/navState";

const BurgerMenu = () => {
	const nav = useStore($nav);
	const menuToogle = useStore($menuToogle);

	return (
		<div className='wrapper'>
			<Menu
				isOpen={menuToogle}
				onStateChange={(state) => changeMenuToogle(state.isOpen)}>
				<Link to="/" style={nav === 'my' ? { textDecoration: 'underline' } : null} onClick={() => {
					setNav('my')
					changeMenuToogle(false)
				}}>Мои задачи</Link>
				<Link to="/create_task" style={nav === 'create' ? { textDecoration: 'underline' } : null} onClick={() => {
					setNav('create')
					changeMenuToogle(false)
				}}>Создать задачу</Link>
			</Menu>
		</div>
	);
}

export default BurgerMenu

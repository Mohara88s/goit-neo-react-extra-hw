import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./Navigation.module.css";
import clsx from "clsx";

const getActiveClassNames = ({ isActive }) => clsx(isActive && styles.active);

export const Navigation = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	return (
		<nav>
			<ul className={styles.nav_list}>
				<li>
					<NavLink className={getActiveClassNames} to="/">
						Home
					</NavLink>
				</li>
				<li>
					{isLoggedIn && (
						<NavLink className={getActiveClassNames} to="/contacts">
							Contacts
						</NavLink>
					)}
				</li>
			</ul>
		</nav>
	);
};

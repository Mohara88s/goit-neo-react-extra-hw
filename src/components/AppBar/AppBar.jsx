import { Navigation } from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { AuthNav } from "../AuthNav/AuthNav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Container from "../Container/Container";
import css from "./AppBar.module.css";

export const AppBar = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	return (
		<header className={css.header}>
			<Container>
				<div className={css.container}>
					<Navigation />
					{isLoggedIn ? <UserMenu /> : <AuthNav />}
				</div>
			</Container>
		</header>
	);
};

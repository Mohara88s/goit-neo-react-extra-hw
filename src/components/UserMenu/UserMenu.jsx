import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";
import Button from "@mui/material/Button";

export const UserMenu = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	return (
		<div className={css.wrapper}>
			<p className={css.username}>Welcome, {user.name}</p>
			<Button
				variant="outlined"
				color="primary"
				type="button"
				onClick={() => dispatch(logOut())}
			>
				Logout
			</Button>
		</div>
	);
};

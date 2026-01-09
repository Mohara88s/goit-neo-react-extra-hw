import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { ClipLoader } from "react-spinners";
import css from "./App.module.css";

const Layout = lazy(() => import("../../layouts/Layout/Layout"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegisterPage = lazy(() =>
	import("../../pages/RegisterPage/RegisterPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() =>
	import("../../pages/ContactsPage/ContactsPage")
);
const NotFoundView = lazy(() =>
	import("../../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
	const dispatch = useDispatch();
	const isRefreshing = useSelector(selectIsRefreshing);

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	return isRefreshing ? (
		<ClipLoader
			color="#1976d2"
			size={50}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	) : (
		<div className={css.app}>
			<Suspense
				fallback={
					<ClipLoader
						color="#1976d2"
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				}
			>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<HomePage />} />

						<Route
							path="/register"
							element={
								<RestrictedRoute redirectTo="/" component={<RegisterPage />} />
							}
						/>

						<Route
							path="/login"
							element={
								<RestrictedRoute redirectTo="/" component={<LoginPage />} />
							}
						/>

						<Route
							path="/contacts"
							element={
								<PrivateRoute
									redirectTo="/login"
									component={<ContactsPage />}
								/>
							}
						/>

						<Route path="*" element={<NotFoundView />}></Route>
					</Route>
				</Routes>
			</Suspense>
		</div>
	);
}

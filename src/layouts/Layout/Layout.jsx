import { Outlet } from "react-router";
import { AppBar } from "../../components/AppBar/AppBar";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";

const Layout = () => {
	return (
		<>
			<AppBar />
			<Section>
				<Container>
					<Outlet />
				</Container>
			</Section>
		</>
	);
};

export default Layout;

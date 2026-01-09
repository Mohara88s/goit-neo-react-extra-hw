import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveDialog({ open, onAccept, onDecline }) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<React.Fragment>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={onDecline}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete the contact?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={onDecline}>
						NO
					</Button>
					<Button onClick={onAccept} autoFocus>
						YES
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

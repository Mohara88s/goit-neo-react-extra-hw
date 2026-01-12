import { useState } from "react";
import { FaPhone, FaUserLarge } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import Button from "@mui/material/Button";
import ResponsiveDialog from "../ResponsiveDialog/ResponsiveDialog";
import style from "./Contact.module.css";

export default function Contact({ contact, openContactEditModal }) {
	const dispatch = useDispatch();
	const [openDialog, setOpenDialog] = useState(false);

	const { id, name, number } = contact;
	return (
		<div className={style.contact_card}>
			<ul className={style.contact_card_info}>
				<li className={style.contact_card_info_item}>
					<FaUserLarge />
					<p>{name}</p>
				</li>
				<li className={style.contact_card_info_item}>
					<FaPhone />
					<p>{number}</p>
				</li>
			</ul>
			<div className={style.box_for_buttons}>
				<Button
					variant="outlined"
					color="primary"
					onClick={() => {
						openContactEditModal(contact);
					}}
				>
					Edit
				</Button>
				<Button
					variant="outlined"
					color="error"
					onClick={() => {
						setOpenDialog(true);
					}}
				>
					Delete
				</Button>
			</div>
			<ResponsiveDialog
				open={openDialog}
				onAccept={() => {
					dispatch(deleteContact(id));
				}}
				onDecline={() => {
					setOpenDialog(false);
				}}
			/>
		</div>
	);
}

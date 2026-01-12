import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { patchContact } from "../../redux/contacts/operations";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import style from "./ContactEditModal.module.css";

const phoneRegExp = /^\d{3}-\d{2}-\d{2}$/;

const ContactFormSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	number: Yup.string()
		.min(9, "Too Short!")
		.max(9, "Too Long!")
		.matches(phoneRegExp, "Phone number is not valid. It has to be XXX-XX-XX")
		.required("Required"),
});

export default function ContactEditModal({
	openContactEditModal,
	handleCloseModal,
}) {
	const dispatch = useDispatch();

	const nameFieldId = useId();
	const numberFieldId = useId();

	const { id, name, number } = openContactEditModal;
	const initialValues = {
		name: name,
		number: number,
	};

	const handleSubmit = (values, actions) => {
		dispatch(patchContact([id, { ...values }]));
		actions.resetForm();
		handleCloseModal();
	};

	return (
		<Modal
			open={openContactEditModal}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className={style.modal_box}>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={ContactFormSchema}
				>
					<Form className={style.contact_form}>
						<div className={style.contact_form_item}>
							<label htmlFor={nameFieldId} className={style.contact_form_label}>
								Username
							</label>
							<Field
								type="text"
								name="name"
								id={nameFieldId}
								className={style.contact_form_field}
							/>
							<ErrorMessage
								name="name"
								component="span"
								className={style.contact_form_error_message}
							/>
						</div>
						<div className={style.contact_form_item}>
							<label
								htmlFor={numberFieldId}
								className={style.contact_form_label}
							>
								Number
							</label>
							<Field
								type="text"
								name="number"
								id={numberFieldId}
								className={style.contact_form_field}
							/>
							<ErrorMessage
								name="number"
								component="span"
								className={style.contact_form_error_message}
							/>
						</div>

						<Button variant="outlined" color="primary" type="submit">
							Edit
						</Button>
					</Form>
				</Formik>
			</Box>
		</Modal>
	);
}

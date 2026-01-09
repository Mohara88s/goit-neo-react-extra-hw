import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import Button from "@mui/material/Button";
import css from "./RegisterForm.module.css";

const emailRegExp = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const RegFormSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string()
		.matches(emailRegExp, "Email is not valid.")
		.required("Required"),
	password: Yup.string()
		.min(8, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
});

const initialValues = {
	name: "",
	email: "",
	password: "",
};

export const RegisterForm = () => {
	const dispatch = useDispatch();

	const nameFieldId = useId();
	const emailFieldId = useId();
	const passwordFieldId = useId();

	const handleSubmit = (values, actions) => {
		dispatch(register({ ...values }));
		actions.resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={RegFormSchema}
		>
			<Form className={css.form} autoComplete="off">
				<div className={css.form_item}>
					<label className={css.label} htmlFor={nameFieldId}>
						Username
					</label>
					<Field
						type="text"
						name="name"
						id={nameFieldId}
						className={css.form_field}
					/>
					<ErrorMessage
						name="name"
						component="span"
						className={css.error_message}
					/>
				</div>
				<div className={css.form_item}>
					<label className={css.label} htmlFor={emailFieldId}>
						Email
					</label>
					<Field
						type="email"
						name="email"
						id={emailFieldId}
						className={css.form_field}
					/>
					<ErrorMessage
						name="email"
						component="span"
						className={css.error_message}
					/>
				</div>
				<div className={css.form_item}>
					<label className={css.label} htmlFor={passwordFieldId}>
						Password
					</label>
					<Field
						type="password"
						name="password"
						id={passwordFieldId}
						className={css.form_field}
					/>
					<ErrorMessage
						name="password"
						component="span"
						className={css.error_message}
					/>
				</div>

				<Button variant="outlined" color="primary" type="submit">
					Register
				</Button>
			</Form>
		</Formik>
	);
};

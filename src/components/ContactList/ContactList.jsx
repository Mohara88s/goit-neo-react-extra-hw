import { useSelector } from "react-redux";
import { useState } from "react";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import style from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import ContactEditModal from "../ContactEditModal/ContactEditModal";

export default function ContactList() {
	const filteredContacts = useSelector(selectFilteredContacts);
	const [openContactEditModal, setOpenContactEditModal] = useState(null);
	const handleCloseModal = () => setOpenContactEditModal(null);

	return (
		<>
			<ul className={style.contacts_list}>
				{filteredContacts.map((contact) => {
					return (
						<li className={style.contacts_list_item} key={contact.id}>
							<Contact
								contact={contact}
								openContactEditModal={setOpenContactEditModal}
							/>
						</li>
					);
				})}
			</ul>
			{openContactEditModal && (
				<ContactEditModal
					openContactEditModal={openContactEditModal}
					handleCloseModal={handleCloseModal}
				/>
			)}
		</>
	);
}

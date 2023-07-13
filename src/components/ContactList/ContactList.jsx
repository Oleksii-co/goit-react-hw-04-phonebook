import contactList from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contactData, deleteContact }) => {
  return (
    <ol className={contactList.contactList}>
      {contactData.map(({ id, tel, name }) => {
        return (
          <li key={id}>
            {name}: {tel}
            <button type="button" onClick={() => deleteContact(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default ContactList;

ContactList.propTypes = {
  contactData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      tel: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};

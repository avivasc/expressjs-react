import React, { useState } from "react";
import PropTypes from 'prop-types';

import style from "./form.module.scss";
function Form({ user, genders, onSave }) {
  const [firstName, setFirstName] = useState(user ? user.first_name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [birthday, setBirthday] = useState(user ? user.birthdayFormatted : "");
  const [genderId, setGenderId] = useState(user ? user.gender_id : "");

  const onSubmit = (e) => {
    e.preventDefault();

    let currentUser = {
      first_name: firstName,
      last_name: lastName,
      birthday,
      gender_id: genderId,
    };
    if (user) {
      currentUser.user_id = user.user_id;
    } else {
      currentUser.password = password;
    }
    onSave(currentUser);
  };

  return (
    <form className={style.formContent} onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="fname">First name:</label>
      <br />
      <input
        type="text"
        id="fname"
        required
        name="fname"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <br />
      <label htmlFor="lname">Last name:</label>
      <br />
      <input
        type="text"
        id="lname"
        required
        name="lname"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <br />
      {!user && (
        <>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            required
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
        </>
      )}
      <label htmlFor="birthday">Birthday:</label>
      <br />
      <input
        type="date"
        id="birthday"
        required
        name="birthday"
        onChange={(e) => setBirthday(e.target.value)}
        value={birthday}
      />
      <br />
      <label htmlFor="gender">Gender:</label>
      <br />
      <select
        onChange={(e) => setGenderId(e.target.value)}
        required
        name="gender"
        id="gender"
        value={genderId}
      >
        {genders.map((gender) => {
          return (
            <option key={gender.gender_id} value={gender.gender_id}>
              {gender.name}
            </option>
          );
        })}
      </select>
      <br />
      <button>Save</button>
    </form>
  );
}

Form.propTypes = {
  onSave: PropTypes.func,
  user :  PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    password: PropTypes.string,
    birthday: PropTypes.string,
    gender_id: PropTypes.number,
  }),
  genders: PropTypes.arrayOf(
    PropTypes.shape({
      gender_id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};

Form.defaultProps = {
  onSave: {},
  user: null,
  genders: [],
};

export default Form;

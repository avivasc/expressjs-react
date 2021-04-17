import React, { useState } from "react";
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
      <label for="fname">First name:</label>
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
      <label for="lname">Last name:</label>
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
          <label for="password">Password:</label>
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
      <label for="birthday">Birthday:</label>
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
      <label for="gender">Gender:</label>
      <br />
      <select
        onChange={(e) => setGenderId(e.target.value)}
        required
        name="gender"
        id="gender"
      >
        {genders.map((gender) => {
          let selected = genderId === gender.gender_id;
          return (
            <option key={gender.gender_id} selected value={gender.gender_id}>
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

Form.propTypes = {};

Form.defaultProps = {};

export default Form;

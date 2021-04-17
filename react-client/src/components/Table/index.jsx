import React from "react";
import style from "./table.module.scss";

function Table({ users, OnEdit }) {
  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} >
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.birthdayFormatted}</td>
              <td>{user.gender.name}</td>
              <td>
                <button onClick={() => OnEdit(user.user_id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {};

Table.defaultProps = {};

export default Table;

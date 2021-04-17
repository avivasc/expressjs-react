import React, { useState, useEffect } from "react";
import moment from "moment";

import "./App.scss";
import Table from "./components/Table";
import Form from "./components/Form";
import { apiUrl } from "./utils/api";

function App() {
  const [users, setUsers] = useState([]);
  const [genders, setGenders] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadUser();
    loadGenders();
  }, [!showForm]);

  const loadUser = async () => {
    const response = await fetch(`${apiUrl}users`);
    let data = await response.json();
    data.forEach((user, index) => {
      data[index]["birthdayFormatted"] = moment(new Date(user.birthday)).format(
        "YYYY-MM-DD"
      );
    });
    setUsers(data);
  };

  const loadGenders = async () => {
    const response = await fetch(`${apiUrl}genders`);
    let data = await response.json();
    setGenders(data);
  };

  const OnEdit = (userId) => {
    const user = users.find(({ user_id }) => user_id === userId);
    setUser(user);
    setShowForm(true);
  };

  const onSave = async (user) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (user.user_id) {
      await fetch(`${apiUrl}users/${user.user_id}`, {
        headers,
        method: "put",
        body: JSON.stringify(user),
      });
    } else {
      console.log(user);
      await fetch(`${apiUrl}users`, {
        headers,
        method: "post",
        body: JSON.stringify(user),
      });
    }

    setShowForm(false);
  };
  return (
    <div className="container">
      {showForm ? (
        <Form user={user} genders={genders} onSave={onSave} />
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>New</button>
          <Table OnEdit={OnEdit} users={users} />
        </>
      )}
    </div>
  );
}

export default App;

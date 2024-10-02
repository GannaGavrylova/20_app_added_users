import { useDispatch } from "react-redux";
import { removeUser, editUser } from "../../redux/slices/userSlice";
import React, { useState } from "react";
import { Input, Modal } from "antd";
import styles from "./styles.module.css";

function UserItem({ id, name, email, age }) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(name); // Поле для редактирования имени
  const [newEmail, setNewEmail] = useState(email); // Поле для редактирования email
  const [newAge, setNewAge] = useState(age); // Поле для редактирования возраста

  const dispatch = useDispatch();

  function handleClick() {
    setOpen(true);
  }

  function handleSave() {
    dispatch(
      editUser({
        id,
        name: newName,
        email: newEmail,
        age: newAge,
      })
    );
    setOpen(false);
  }
  return (
    <div className={styles.container}>
      <p>{name}</p>
      <p>{age}</p>
      <p>{email}</p>
      <button onClick={handleClick}>Edit</button>
      <button onClick={() => dispatch(removeUser(id))}>Delete</button>

      <Modal
        title="Edit User"
        centered
        open={open}
        onOk={handleSave}
        onCancel={() => dispatch(editUser(id))}
        width={1000}
      >
        <p>Edit Name: </p>
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <p>Edit Email: </p>
        <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        <p>Edit Age: </p>
        <Input value={newAge} onChange={(e) => setNewAge(e.target.value)} />
      </Modal>
    </div>
  );
}

export default UserItem;

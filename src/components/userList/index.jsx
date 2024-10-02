import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { addUser } from "../../redux/slices/userSlice.js";
import { uid } from "uid";
import UserItem from "../userItem";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const onFinish = (values) => {
  console.log(values);
};

function UserList() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [form] = Form.useForm();

  const users = useSelector((state) => state.users.dataUsers);
  console.log(users);
  const dispatch = useDispatch();

  function handleSubmit(values) {
    const { name, email, age } = values.user;

    if (name && email && age) {
      dispatch(
        addUser({
          id: uid(),
          name,
          email,
          age,
        })
      );
    }

    form.resetFields();
  }

  return (
    <div className={styles.user_container}>
      <h1>Add List</h1>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={handleSubmit}
        form={form}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[
            {
              type: "number",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            marginLeft: "200px",
          }}
        >
          Add User
        </Button>
        {users.length > 0 ? (
          users.map((user) => <UserItem key={user.id} {...user} />)
        ) : (
          <p>No user available </p>
        )}
      </Form>
    </div>
  );
}

export default UserList;

import React, { useState, useEffect } from "react";
import { Button, Container, Input, InputLogoBox, LogoDiv } from "./style";
import logo from "../../../../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const InputBox = ({ editData, setEditData, updateTodos }) => {
  const [title, setTitle] = useState("");
  const [addStatus, setAddStatus] = useState(0);
  const [addStatusMessage, setAddStatusMessage] = useState("");
  const [editStatusMessage, setEditStatusMessage] = useState("");
  const [editStatus, setEditStatus] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
    }
  }, [editData]);

  const handleSubmit = async () => {
    if (title) {
      try {
        if (editData) {
          const res = await axios.patch("http://localhost:8020/todos/update", {
            id: editData?.id,
            title: title,
          });
          console.log("res.data", res.data);
          setEditStatus(res?.data?.status);
          setEditStatusMessage(res?.data?.message);
          setEditData(null);
          setTitle("");
          updateTodos();
        } else {
          const res = await axios.post("http://localhost:8020/todos/add", {
            title,
          });
          console.log("res.data", res.data);
          setAddStatus(res?.data?.status);
          setAddStatusMessage(res?.data?.message);
          setEditData(null);
          setTitle("");
          setTimeout(updateTodos, 1000);
        }
      } catch (err) {
        console.log("err => ", err);
        setError(err);
      }
    }
  };

  useEffect(() => {
    if (addStatus == 200 && addStatusMessage?.length > 0) {
      toast.success(addStatusMessage);
      setAddStatusMessage("");
    }

    if (addStatus >= 400 && addStatusMessage?.length > 0) {
      toast.info(addStatusMessage);
      setAddStatusMessage("");
    }
  }, [addStatus, addStatusMessage]);

  useEffect(() => {
    if (editStatus == 200 && editStatusMessage?.length > 0) {
      toast.success(editStatusMessage);
      setEditStatusMessage("");
    }

    if (editStatus >= 400 && editStatusMessage?.length) {
      toast.info(editStatusMessage);
      setEditStatusMessage("");
    }
  }, [editStatus, editStatusMessage]);

  useEffect(() => {
    if (error) {
      if (error?.length > 0) {
        toast.error(error);
      }
    }
  }, [error]);

  return (
    <Container>
      <InputLogoBox>
        <LogoDiv>
          <img src={logo} />
        </LogoDiv>
        <Input
          placeholder="New Todo"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </InputLogoBox>

      <Button onClick={handleSubmit}>
        {editData ? "Edit Task" : "Add New Task"}
      </Button>
    </Container>
  );
};

export default InputBox;

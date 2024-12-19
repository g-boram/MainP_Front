import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

export default function BoardForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: 4,
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);

    try {
      const response = await axios.post("http://localhost:8080/board", formData);
      alert("Board created successfully!");
      setFormData({ title: "", content: "", ...formData }); // Reset form
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create the board. Please try again.");
    }
  };

  return (
    <FormContainer>
      <h2>Create a New Board Post</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the title"
          required
        />
        <TextareaField
          label="Content"
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter the content"
          rows="5"
          required
        />
        {/* <InputField
          label="Author"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        /> */}
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </form>
    </FormContainer>
  );
}

function InputField({ label, id, ...props }) {
  return (
    <FormGroup>
      <label htmlFor={id}>{label}</label>
      <FormControlInput id={id} {...props} />
    </FormGroup>
  );
}

function TextareaField({ label, id, ...props }) {
  return (
    <FormGroup>
      <label htmlFor={id}>{label}</label>
      <FormControlTextArea id={id} {...props}></FormControlTextArea>
    </FormGroup>
  );
}

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  > h2 {
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
`;

const FormControlInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormControlTextArea = styled.textarea`
  resize: vertical;
`;
const SubmitBtn = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;

  :hover {
    background-color: #45a049;
  }
`;

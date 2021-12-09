import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { SketchPicker } from "react-color";

export default function NameForm({ setName, setUserColour }) {
  const [colour, setColour] = useState("#fff");
  const [userName, setUserName] = useState();

  const handleChange = (color) => {
    setColour(color.hex);
    setUserColour(color.hex);
  };

  const handleSubmit = () => {
    setName(userName);
    localStorage.setItem("name", userName);
    localStorage.setItem("colour", colour);
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: colour }}
    >
      <div className="bg-white w-full rounded-md shadow-lg max-w-xl px-4 py-4">
        <h3 className="text-center text-2xl font-semibold">
          Welcome To Virtual Meeting Hangout!
        </h3>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
            ]}
          >
            <Input
              className="rounded-md"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="color"
            label="Pick Your Favourite Colour"
            rules={[
              {
                required: true,
                message: "Please pick a colour!",
              },
            ]}
          >
            <SketchPicker color={colour} width="60%" onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <div className="text-center">
              <Button
                htmlType="submit"
                appearance="primary"
                style={{ border: "none" }}
                className="rounded-lg w-4/5 mt-2 h-12 bg-gray-700 text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white transition duration-300"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

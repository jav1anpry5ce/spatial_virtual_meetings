import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { SketchPicker } from "react-color";

export default function NameForm({ setName, setUserColour, setUserImage }) {
  const [colour, setColour] = useState("#f5f5f5");
  const [userName, setUserName] = useState();
  // const [url, setUrl] = useState();

  const handleChange = (color) => {
    setColour(color.hex);
    setUserColour(color.hex);
  };

  const handleSubmit = () => {
    setName(userName);
    // setUserImage(url);
    localStorage.setItem("name", userName);
    localStorage.setItem("colour", colour);
    // localStorage.setItem("image", url);
    window.location.reload();
  };

  return (
    <div
      className="h-screen w-full flex flex-col justify-between items-center"
      style={{ backgroundColor: colour }}
    >
      <div className="flex items-center h-full">
        <div className="bg-white w-full rounded-md max-w-xl px-4 py-4 my-4 shadow-md shadow-gray-300">
          <h3 className="text-center text-2xl font-semibold text-gray-800">
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
              <SketchPicker
                color={colour}
                width="60%"
                onChange={handleChange}
              />
            </Form.Item>
            {/* <Form.Item
              name="image_url"
              label="Image URL"
              rules={[
                {
                  required: true,
                  message: "Please enter an image url!",
                },
              ]}
            >
              <Input
                onChange={(e) => setUrl(e.target.value)}
                className="rounded-md"
              />
            </Form.Item> */}
            <Form.Item>
              <div className="text-center">
                <Button
                  htmlType="submit"
                  appearance="primary"
                  style={{ border: "none" }}
                  className="rounded-full w-4/5 mt-2 h-12 bg-gray-700 text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white transition duration-300 shadow-md shadow-gray-700"
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="bg-gray-900 w-full max-h-16 h-full">
        <div className="text-center py-1 space-y-2">
          <h3 className="text-white font-semibold text-base">
            DEVELOPED BY UCC IT CLUB
          </h3>
          <h3 className="text-white font-semibold text-base">&copy; 2021</h3>
        </div>
      </div>
    </div>
  );
}

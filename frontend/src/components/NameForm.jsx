import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { SketchPicker } from "react-color";

export default function NameForm() {
  const [colour, setColour] = useState("#f5f5f5");
  const [userName, setUserName] = useState();
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (color) => {
    setColour(color.hex);
  };

  const handleSubmit = () => {
    localStorage.setItem("name", userName);
    localStorage.setItem("colour", colour);
    localStorage.setItem("imageUrl", imageUrl);
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between items-center space-y-2"
      style={{ backgroundColor: colour }}
    >
      <div className="bg-white w-full rounded-md max-w-xl px-4 py-4 mt-2 shadow-md shadow-gray-300">
        <h3 className="text-center text-3xl font-semibold text-zinc-800">
          Welcome To Virtual Hangout!
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
            name="image_url"
            label="Image URL"
            rules={[
              {
                required: true,
                message:
                  "Please enter your image url (copy an image link for any website i.e facebook that has your image)",
              },
            ]}
          >
            <Input
              className="rounded-md"
              onChange={(e) => setImageUrl(e.target.value)}
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
                className="rounded-full w-4/5 mt-2 h-12 bg-gray-700 text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white transition duration-300 shadow-md shadow-gray-700"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="bg-gray-900 mix-blend-luminosity w-full h-full">
        <div className="text-center py-0.5 space-y-0.5">
          <h3 className="text-white font-semibold text-base">Team Immersive</h3>
          <h3 className="text-white font-semibold text-base">&copy; 2021</h3>
        </div>
      </div>
    </div>
  );
}

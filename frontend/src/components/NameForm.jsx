import React, { useState } from "react";
import { Form, Input } from "antd";

export default function NameForm() {
  const [userName, setUserName] = useState();
  const [imageUrl, setImageUrl] = useState();

  const handleSubmit = () => {
    localStorage.setItem("name", userName);
    localStorage.setItem("imageUrl", imageUrl);
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center bg-gradient-to-br from-slate-900 to-emerald-600">
      <div className="flex-1 flex items-center w-full max-w-xl">
        <div className="bg-white w-full h-full rounded-md max-w-xl px-4 py-4 mt-2 shadow-xl">
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
            <Form.Item className="m-0">
              <div className="text-center">
                <button
                  type="submit"
                  className="rounded-full w-4/5 mt-2 h-12 bg-gray-700 text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white transition duration-300 shadow-md shadow-gray-700"
                >
                  Submit
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="bg-slate-800 mix-blend-luminosity w-full h-full">
        <div className="text-center py-0.5 space-y-0.5">
          <h3 className="text-white font-semibold text-base">Team Immersive</h3>
          <h3 className="text-white font-semibold text-base">&copy; 2021</h3>
        </div>
      </div>
    </div>
  );
}

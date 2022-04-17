import React, { useState } from "react";
import { Form, Input } from "antd";


export default function NameForm() {
  const [userName, setUserName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    localStorage.setItem("name", userName);
    localStorage.setItem("imageUrl", imageUrl);
    window.location.reload();
  };

  const generateImageURL = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    const image = `https://avatars.dicebear.com/api/pixel-art-neutral/${randomNumber}.svg`;
    setImageUrl(image);
    form.setFieldsValue({
      image: image,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center bg-gradient-to-br from-slate-900 to-emerald-600">
      <div className="flex-1 flex items-center w-full max-w-xl">
        <div className="bg-white w-full h-full rounded-md max-w-xl px-4 py-4 mt-2 shadow-xl">
          <h3 className="text-center text-3xl font-semibold text-zinc-800">
            Welcome To Virtual Hangout!
          </h3>
          <Form layout="vertical" onFinish={handleSubmit} form={form}>
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
              name="image"
              label="Image URL"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter your image url (copy an image link for any website i.e facebook that has your image)",
                },
              ]}
            >
              <div className="relative">
                <Input
                  className="rounded-md"
                  onChange={(e) => setImageUrl(e.target.value)}
                  value={imageUrl}
                />
                <button
                  className="bg-gray-800/30 text-white py-0.5 px-2 rounded-full hover:bg-gray-800 absolute right-1 top-[3px]"
                  type="button"
                  onClick={generateImageURL}
                >
                  Generate Random
                </button>
              </div>
            </Form.Item>

            <Form.Item className="m-0">
              <div className="text-center">
                <button
                  type="submit"
                  className="rounded-full w-2/5 mt-2 h-12 bg-gray-700 text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white transition duration-300 shadow-md hover:shadow-gray-700/50"
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
          <h3 className="text-white font-semibold text-base">
            &copy; 2021 Team Immersive
          </h3>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiUploadCloudLine } from "react-icons/ri";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [qrCode, setQRCode] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("http://10.1.1.88:3000/upload", formData)
        .then((response) => {
          setQRCode(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedFile]);

  return (
    <main className="bg-slate-50 h-screen flex justify-center items-center">
      <section className="flex gap-24 mt-32">
        <div className="flex flex-col gap-8">
          <h2 className="font-bold text-6xl text-gray-700 leading-tight">
            SnapQR: Sharing
            <br />
            Made Simple.
          </h2>
          <h3 className="font-medium text-gray-600 text-2xl">
            Fast, Easy, and 100% Free!
          </h3>
        </div>
        <section className="flex flex-col gap-10">
          <div className="h-min bg-white text-center flex flex-col gap-4 px-24 pt-24 pb-24 rounded-2xl shadow-xl text-gray-600 font-medium">
            <input type="file" onChange={handleFileChange} />
            <button className="mt-12 bg-blue-500 hover:bg-blue-600 duration-150 text-white px-8 py-4 rounded-full text-2xl flex items-center gap-2">
              Upload File
              <RiUploadCloudLine className="text-white fill-white" size={24} />
            </button>
            Or drop it here!
          </div>
          <div className="flex items-center justify-between font-medium text-sm text-gray-600 gap-4">
            <span>
              No file?
              <br />
              Try one of these:
            </span>
            <img
              className="h-16 rounded-lg cursor-pointer hover:shadow-md duration-150"
              src="https://static.remove.bg/uploader-examples/person/7_thumbnail.jpg"
            />
            <img
              className="h-16 rounded-lg cursor-pointer hover:shadow-md duration-150"
              src="https://static.remove.bg/uploader-examples/product/9_thumbnail.jpg"
            />
            <img
              className="h-16 rounded-lg cursor-pointer hover:shadow-md duration-150"
              src="https://static.remove.bg/uploader-examples/person/6_thumbnail.jpg"
            />
            <img
              className="h-16 rounded-lg cursor-pointer hover:shadow-md duration-150"
              src="https://static.remove.bg/uploader-examples/animal/5_thumbnail.jpg"
            />
          </div>
        </section>
      </section>
      {qrCode && <img src={qrCode} />}
    </main>
  );
};

export default App;

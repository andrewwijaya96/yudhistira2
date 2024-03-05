"use client";

import { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFilePdf } from "react-icons/ai";
import { analytics } from "@/pages/firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Uploader() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [fileupload, setfileupload] = useState(null);

  const handleFileChange = (files) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      if (selectedFile.size > 3 * 1024 * 1024) {
        // File size exceeds 3MB limit
        alert("File size exceeds 3MB limit.");
        return;
      }
      if (selectedFile.type !== "application/pdf") {
        // Invalid file type
        alert("Only PDF files are allowed.");
        return;
      }
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setfileupload(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const upload = async () => {
    console.log(fileupload);
    if (fileupload !== null) {
      const fileref = ref(
        analytics,
        `sop/${fileName}/${fileupload.lastModified}`
      );
      uploadBytes(fileref, fileupload).then((data) => {
        getDownloadURL(data.ref).then((ur) => {
          console.log("url", ur);
        });
      });
    }
  };

  return (
    <main>
      <div className="form-bok">
        <form
          action=""
          onClick={() => document.querySelector(".input-field").click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="application/pdf"
            className="input-field"
            hidden
            onChange={({ target: { files } }) => handleFileChange(files)}
          />

          {file ? (
            <AiFillFilePdf color="#1475cf" size={60} />
          ) : (
            <>
              <MdCloudUpload color="#1475cf" size={60} />
              <p>Browse File to upload</p>
            </>
          )}
        </form>
      </div>
      <section className="uploaded-row">
        <AiFillFilePdf color="#1475cf" />
        <span className="upload-content">
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName("No selected file");
              setFile(null);
            }}
          />
        </span>
      </section>
      <div className="file-uploader-form">
        <input
          type="text"
          value={fileName}
          onChange={handleFileNameChange}
          placeholder="Enter file name"
          required
        />
      </div>
      <button onClick={upload}>Upload</button>
    </main>
  );
}

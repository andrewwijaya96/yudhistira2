"use client";

import { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFilePdf } from "react-icons/ai";
import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Uploader() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [fileVersion, setFileVersion] = useState("1.1.0");

  // const handleFileChange = (files) => {
  //   if (files && files[0]) {
  //     const selectedFile = files[0];
  //     if (selectedFile.size > 3 * 1024 * 1024) {
  //       alert("File size exceeds 3MB limit.");
  //       return;
  //     }
  //     if (selectedFile.type !== "application/pdf") {
  //       alert("Only PDF files are allowed.");
  //       return;
  //     }
  //     setFileName(selectedFile.name);
  //     setFile(selectedFile);
  //   }
  // };

  const handleFileChange = (files) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      if (selectedFile.size > 3 * 1024 * 1024) {
        // Menggunakan toast notification untuk memberi tahu bahwa ukuran file melebihi batas
        toast.error("File size exceeds 3MB limit.");
        return;
      }
      if (selectedFile.type !== "application/pdf") {
        // Menggunakan toast notification untuk memberi tahu bahwa hanya file PDF yang diperbolehkan
        toast.error("Only PDF files are allowed.");
        return;
      }
      setFileName(selectedFile.name);
      setFile(selectedFile);
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

  // const handleFileVersionChange = (e) => {
  //   setFileVersion(e.target.value);
  // };

  // const handleFileNameChange = (e) => {
  //   setFileName(e.target.value);
  // };

  const handleFileVersionChange = (e) => {
    setFileVersion(e.target.value.replace(/[^\w.-]/g, ''));
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value.replace(/[^\w.-]/g, ''));
  };


  // const upload = async () => {
  //   if (file !== null) {
  //     const fileref = ref(storage, `sop/${v4() + fileVersion + file.name}`);
  //     const metadata = {
  //       customMetadata: {
  //         version: fileVersion,
  //       },
  //     };
  //     uploadBytes(fileref, file, metadata).then((data) => {
  //       getDownloadURL(data.ref).then((ur) => {
  //         console.log("url", ur);
  //         // Trigger success notification
  //         toast.success('File uploaded successfully!');
  //       });
  //     });
  //   } else {
  //     // Trigger error notification
  //     toast.error('Please select a file to upload.');
  //   }
  // };

  const upload = async () => {
    if (file !== null) {
      const fileref = ref(storage, `sop/${v4() + fileVersion + file.name}`);
      const metadata = {
        customMetadata: {
          version: fileVersion,
        },
      };
      uploadBytes(fileref, file, metadata).then((data) => {
        getDownloadURL(data.ref).then((ur) => {
          console.log("url", ur);
          // Trigger success notification
          toast.success('File uploaded successfully!');
        });
      });
    } else {
      // Trigger error notification
      toast.error('Please select a file to upload.');
    }
  };

  return (
    <main>
      <ToastContainer />
      <div className="upload-description">
        <h2>Upload File</h2>
        <p>Select and upload the files of your choice</p>
      </div>

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
            <AiFillFilePdf color="#1475cf" size={30} />
          ) : (
            <>
              <MdCloudUpload color="#483EA8" size={40} />
              {/* <p>Browse File to upload</p> */}
              <p>Drag & Drop</p>
              <p>OR</p>
              {/* <p>Browse File</p> */}
              <button className="buttonfile">Browse file</button>
              <span className="criteria">Supported formates: PDF, Max File Size : 3Mb</span>
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
          //   type="text"
          //   onChange={handleFileNameChange}
          //   placeholder="Enter file name"
          //   required
          // />
          type="text"
          onChange={handleFileNameChange}
          placeholder="Enter file name"
          required
          value={fileName} // Menampilkan nilai fileName yang telah dibersihkan
        />
      </div>
      <div className="file-uploader-form">
        {/* <input
          type="text"
          onChange={handleFileVersionChange}
          placeholder="version name"
          required
        /> */}
        <input
          type="text"
          onChange={handleFileVersionChange}
          placeholder="Version name"
          required
          value={fileVersion} // Menampilkan nilai fileVersion yang telah dibersihkan
        />
      </div>
      <button onClick={upload}>
        <h3>Upload</h3>
      </button>
    </main>
  );
}

import Image from "next/image";
import { useState } from "react";
import { Inter } from "next/font/google";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFilePdf } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

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
              <p>File types : PDF, Max Size : 3MB</p>
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
              // window.location.reload();
            }}
          />
        </span>
      </section>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { storage } from "../firebase/firebase-config";
import { ref, getDownloadURL, listAll, getMetadata } from "firebase/storage";

export default function Dashboard() {
  const [fileList, setFileList] = useState([]);

  const imageListRef = ref(storage, `sop/`);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      const itemsWithUrls = response.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item);
        const fileVersion = metadata.customMetadata.version;
        return { name: item.name, url, fileVersion };
      });

      Promise.all(itemsWithUrls).then((items) => setFileList(items));
    });
  }, []);

  let pageHeading = "Udin";

  return (
    <div>
      <h1>{pageHeading}</h1>
      {fileList.map((item) => {
        return (
          <div>
            <p>{item.name}</p>
            <p>{item.fileVersion}</p>
            <a href={item.url}>test</a>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { storage } from "@/pages/firebase/firebase-config";
import { ref, getDownloadURL, listAll } from "firebase/storage";

export default function Dashboard() {
  const [sopList, setSopList] = useState([]);

  const imageListRef = ref(storage, `sop/SOP Finance`);

  useEffect(() => {
    setSopList([]);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setSopList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  let pageHeading = "Udin";

  return (
    <div>
      <h1>{pageHeading}</h1>
      {sopList.map((url) => {
        return <a href={url}>link</a>;
      })}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// // import Navbar from "../../components/navbar/index.js";
// import { storage } from "../firebase/firebase-config";
// import { ref, getDownloadURL, listAll, getMetadata } from "firebase/storage";
// import DataTable  from "../../components/versiontable/index.js";



// export default function Dashboard() {
//   const [fileList, setFileList] = useState([]);
//   const imageListRef = ref(storage, `sop/`);
//   const [pageHeading, setPageHeading] = useState("Table SOP");

//   useEffect(() => {
//     listAll(imageListRef).then((response) => {
//       const itemsWithUrls = response.items.map(async (item) => {
//         const url = await getDownloadURL(item);
//         const metadata = await getMetadata(item);
//         const fileVersion = metadata.customMetadata.version;
//         return { id: item.id, name: item.name, version: fileVersion, url };
//       });

//       Promise.all(itemsWithUrls).then((items) => setFileList(items));
//     });
//   }, [imageListRef]);



//   return (
//     <div>
//       {/* <Navbar /> */}
//       <div className="table-container">
//         <h1>{pageHeading}</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>File Name</th>
//               <th>Version</th>
//               <th>Download Link</th>
//             </tr>
//           </thead>
//           <tbody>
//             {fileList.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.version}</td>
//                 <td>
//                   <a href={item.url} target="_blank" rel="noopener noreferrer">
//                     Download
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import { userRows } from "@/pages/data";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "fileName",
//     type: "string",
//     headerName: "File Name",
//     width: 500,
//   },
//   {
//     field: "version",
//     type: "string",
//     headerName: "File Version",
//     width: 250,
//   },
//   {
//     field: "createdAt",
//     headerName: "Created At",
//     width: 250,
//     type: "string",
//   },
// ];

// const Home = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="users">
//       <div className="info">
//         <h1>SOP FILES</h1>
//         {/* <button onClick={() => setOpen(true)}>Add New File</button> */}
//       </div>
//       <DataTable slug="users" columns={columns} rows={userRows} />
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { storage } from "../firebase/firebase-config";
import { ref, getDownloadURL, listAll, getMetadata } from "firebase/storage";
// import Navbar from '../../components/navbar/index.js'; // Sesuaikan path jika diperlukan
// import Sidebar from '../../components/sidebar/index.js'; // Sesuaikan path jika diperlukan
// import Footer from '../../components/footer/index.js';

import Navbar from "../../components/navbar/navbar.js";
import Footer from "../../components/footer/footer.js";
import Sidebar from "../../components/sidebar/sidebar.js";
// import Uploader from "../pages/upload/index.js";

export default function Dashboard() {
  const [fileList, setFileList] = useState([]);
  const imageListRef = ref(storage, `sop/`);
  const [pageHeading, setPageHeading] = useState("Table SOP");

  useEffect(() => {
    listAll(imageListRef)
      .then((response) => {
        const itemsWithUrls = response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          const fileVersion = metadata.customMetadata.version;
          return { id: item.id, name: item.name, version: fileVersion, url };
        });

        Promise.all(itemsWithUrls).then((items) => setFileList(items));
      })
      .catch((error) => {
        console.error("Error fetching data from Firebase: ", error);
      });
  }, [imageListRef]);

  return (
    <div>
      <div className="table-container">
        <h1>{pageHeading}</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Version</th>
              <th>Download Link</th>
            </tr>
          </thead>
          <tbody>
            {fileList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.version}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


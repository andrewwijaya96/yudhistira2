import React, { useState } from "react";
// import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/table/table";

import { userRows } from "@/pages/data";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "fileName",
    type: "string",
    headerName: "File Name",
    width: 500,
  },
  {
    field: "version",
    type: "string",
    headerName: "File Version",
    width: 250,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 250,
    type: "string",
  },
];

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="users">
      <div className="info">
        <h1>SOP FILES</h1>
        {/* <button onClick={() => setOpen(true)}>Add New File</button> */}
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
    </div>
  );
};

export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import { menu } from "@/pages/data";

// const Menu = () => {
//   return (
//     <div className="menu">
//       {menu.map((item) => (
//         <div className="item" key={item.id}>
//           <span className="title">{item.title}</span>
//           {item.listItems.map((listItem) => (
//             <Link to={listItem.url} className="listItem" key={listItem.id}>
//               <img src={listItem.icon} alt="" />
//               <span className="listItemTitle">{listItem.title}</span>
//             </Link>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Menu;

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // Define the menu data directly within the component
  const menu = [
    {
      id: 1,
      title: "Dashboard",
      listItems: [
        {
          id: 1,
          title: "Homepage",
          url: "/home",
          icon: "../home.svg",
        },
        {
          id: 2,
          title: "Upload",
          url: "/upload",
          icon: "../Plus4.svg",
        },
      ],
    },
  ];

  return (
    <div className="sidebar">
      {menu.map((menuItem) => (
        <div className="item" key={menuItem.id}>
          <span className="title">{menuItem.title}</span>
          {menuItem.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

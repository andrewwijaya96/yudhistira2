// File: Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { menu } from '../../pages/data.js'; // Sesuaikan dengan path yang sesuai

const Navigation = () => {
  return (
    <nav>
      <ul>
        {menu.map((menuItem) => (
          <li key={menuItem.id}>
            <span>{menuItem.title}</span>
            <ul>
              {menuItem.listItems.map((subMenuItem) => (
                <li key={subMenuItem.id}>
                  <Link to={subMenuItem.url}>
                    <img src={subMenuItem.icon} alt={subMenuItem.title} />
                    <span>{subMenuItem.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

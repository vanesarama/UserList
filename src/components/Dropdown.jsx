import React, { useState } from "react";
const SORT_DATA = [{ firstName: "Name", lastName: "Surname", email: "Email" }];

const Dropdown = ({ onSelectCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("none");

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function getKey(key) {
    setSelectedKey(key);
    setIsOpen(false);
    onSelectCallback && onSelectCallback(key);
  }

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}>
        {selectedKey === "none" ? "Filter by" : SORT_DATA[0][selectedKey]}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {Object.keys(SORT_DATA[0]).map(
            (key) =>
              key !== "none" && (
                <a key={key} href="#" onClick={() => getKey(key)}>
                  {SORT_DATA[0][key]}
                </a>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

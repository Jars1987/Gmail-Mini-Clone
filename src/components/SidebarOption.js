import React from 'react';
import { useNavigate } from 'react-router';
import './SidebarOption.css';

function SidebarOption({ Icon, title, number, selected }) {
  let navigate = useNavigate();
  return (
    <div
      className={`sidebarOption ${selected && 'sidebarOption--active'}`}
      onClick={() => {
        if (title === 'Inbox') {
          navigate('/');
        }
      }}>
      <Icon />
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
}

export default SidebarOption;

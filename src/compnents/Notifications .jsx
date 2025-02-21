import React from 'react'
import { useSelector } from "react-redux";

export default function Notifications () {
    const notifications = useSelector((state) => state.notifications.notifications);
  return (
    <div>
       <h1>My App</h1>
       <span>🔔 {notifications} </span>
    </div>
  )
}

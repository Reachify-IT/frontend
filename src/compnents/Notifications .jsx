import React from "react";
import { useSelector } from "react-redux";

export default function Notifications() {
  const notifications = useSelector((state) => state.notifications.notifications);

  return (
    <div>
      <div className="relative shadow rounded-xl bg-blue-100 max-w-2xl m-auto flex flex-col gap-4 z-50 py-2 overflow-y-auto h-[80vh] lg:h-[450px] px-4 no-scrollbar">
        <span className="py-2 text-blue-900 font-bold bg-blue-100">Notifications..</span>
        {notifications.length > 0 ? (
          [...notifications] 
            .reverse() 
            .map((notification, index) => (
              <div key={index} className="flex items-center bg-blue-50 py-3 rounded px-5 shadow-md">
                <div className="px-4">
                  <h1 className="text-xl font-normal font-mono">{notification}</h1>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center text-gray-500 font-semibold py-5">
            No Notifications
          </div>
        )}
      </div>
    </div>
  );
}

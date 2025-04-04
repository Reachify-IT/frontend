import { useEffect } from "react";
import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    console.log("Connecting to WebSocket server...", userId);
    if (!this.socket) {
      this.socket = io(import.meta.env.VITE_BackendURL, {
        withCredentials: true,
      });

      this.socket.on("connect", () => {
        console.log("Connected to WebSocket server", this.socket.id);

        // Emit user registration once connected
        if (userId) {
          this.socket.emit("registerUser", userId);
          console.log(`Registered user: ${userId}`);
        }
      });

      this.socket.on("notification", (data) => {
        console.log("New Notification:", data.message);
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });
    }
  }

  listen(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, callback);
    }
  }

  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}



const socketService = new SocketService();
export default socketService;

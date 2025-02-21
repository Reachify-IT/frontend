import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io("http://localhost:8000"); // Change this in production

      this.socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });
    }
  }

  listen(eventName, callback) {
    if (!this.socket) return;
    this.socket.on(eventName, callback);
  }

  emit(eventName, data) {
    if (!this.socket) return;
    this.socket.emit(eventName, data);
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

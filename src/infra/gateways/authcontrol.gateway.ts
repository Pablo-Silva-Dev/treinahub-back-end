import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server } from "socket.io";

type TWebSocketEvent = {
  event: string;
  message: string;
};

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class AuthControlGateway {
  @WebSocketServer()
  server: Server;
  handleEvent(
    eventName: string,
    @MessageBody() message: string
  ): TWebSocketEvent {
    this.server.emit(eventName, message);
    return {
      event: eventName,
      message,
    };
  }
}

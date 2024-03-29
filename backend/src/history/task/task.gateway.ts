import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { HistoryT } from '@shared/dtos';
import * as ws from 'ws';

export interface HistoryGateway {
  sendHistoryUpdate(history: HistoryT): void;
}

@WebSocketGateway()
export class TaskHistoryGateway implements HistoryGateway {
  constructor() {}

  @WebSocketServer()
  server: ws.Server;

  sendHistoryUpdate(task: HistoryT) {
    this.server.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          event: 'history:task:new',
          data: task,
        }),
      );
    });
  }
}

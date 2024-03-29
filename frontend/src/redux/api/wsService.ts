export class WebSocketService extends EventTarget {
  private ws: WebSocket;

  private constructor(ws: WebSocket) {
    super();
    this.ws = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.dispatchEvent(new CustomEvent(data.event, { detail: data.data }));
    };
  }

  public on<T>(eventName: string, cb: (data: T) => void) {
    this.addEventListener(eventName, (event) => {
      cb((<CustomEvent>event).detail);
    });
  }

  public static getInstace(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(
        new WebSocket("ws://localhost:3000")
      );
    }

    return WebSocketService.instance;
  }

  private static instance: WebSocketService;
}

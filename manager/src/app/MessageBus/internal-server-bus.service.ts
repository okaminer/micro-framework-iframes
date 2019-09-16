import {Injectable} from '@angular/core';
import {FrameMeta} from './FrameMeta';
import {InternalMessage, InternalMessageCode} from './InternalMessage';

@Injectable({
  providedIn: 'root'
})
export class InternalServerBusService {

  iframes: Map<String, FrameMeta>;

  constructor() {}

  start() {
    this.iframes = new Map();
    window.addEventListener('message', this.messageHandler.bind(this), {capture: true});
  }

  messageHandler(message) {
    const data: InternalMessage = Object.assign(new InternalMessage(), message);
    if (data) {
      if (data) {
        switch (data.opcode) {
          case InternalMessageCode.Register:
            this.registerIframe(data);
            break;
          case InternalMessageCode.Data:
            this.sendMessage(data);
            break;
          default:
            console.error('Can\'t find opcode:  ' + data.opcode);
            break;
        }
      }
    }
  }

  sendMessage(message: InternalMessage) {
    if (this.iframes.get(message.destFrame)) {
      console.log('Sending message from: ' + message.sourceFrame + ' to: iframe: ' + message.destFrame + ' data: ' + message.data);
      this.iframes.get(message.destFrame).subject.next(message);
    } else {
      console.error('No iframe is registered with id: ' + message.destFrame);
    }
  }
  registerIframe(message: InternalMessage) {
    if (!this.iframes.get(message.sourceFrame)) {
      const frame = new FrameMeta(message.sourceFrame);
      this.iframes.set(message.sourceFrame, frame);
      frame.subject.subscribe(value => this.sendToIframe(value));

    }
  }

  sendToIframe(message: any) {
    const iframe = document.getElementById('webuiFrame');
    (<HTMLIFrameElement>iframe).contentWindow.postMessage('message from parent ', '*');
  }
}

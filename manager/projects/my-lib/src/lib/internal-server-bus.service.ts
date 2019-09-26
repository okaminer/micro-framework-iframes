import {Injectable} from '@angular/core';
import {FrameMeta} from './frame-meta';
import {InternalMessage, InternalMessageCode} from './internal-message';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalServerBusService {

  iframes: Map<String, FrameMeta>;

  private masterSubject: Subject<InternalMessage>;
  constructor() {}

  start(): Subject<any> {
    this.iframes = new Map();
    window.addEventListener('message', this.messageHandler.bind(this), {capture: true});
    this.masterSubject = new Subject<InternalMessage>();
    return this.masterSubject;
  }

  messageHandler(message) {
    const data: InternalMessage = InternalMessage.fromData(JSON.parse(message.data));
    if (data) {
      if (data) {
        switch (data.opcode) {
          case InternalMessageCode.Register:
            this.registerIframe(data);
            break;
          case InternalMessageCode.Data:
            this.sendMessageToFrame(data);
            break;
          default:
            console.error('Can\'t find opcode:  ' + data.opcode);
            break;
        }
      }
    }
  }


  sendMessage(data: any, destApp: string){
    const message = new InternalMessage('master', destApp, InternalMessageCode.Data, data);
    this.sendMessageToFrame(message);
  }

  private sendMessageToFrame(message: InternalMessage) {
    if (message.destFrame === 'master') {
        this.masterSubject.next(message);
        return;
    }

    const iframe = document.getElementById(message.destFrame);
    if (iframe) {
      (<HTMLIFrameElement>iframe).contentWindow.postMessage(JSON.stringify(message), '*');
    } else {
      console.warn('Can\'t find iframe ' + message.destFrame);
    }
  }

  private registerIframe(message: InternalMessage) {
    if (!this.iframes.get(message.sourceFrame)) {
      const frame = new FrameMeta(message.sourceFrame);
      this.iframes.set(message.sourceFrame, frame);
    }
  }

}

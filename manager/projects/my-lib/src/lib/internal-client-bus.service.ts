import {Subject} from 'rxjs';
import {InternalMessage, InternalMessageCode} from './internal-message';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InternalClientBusService {
  masterSubject: Subject<InternalMessage>;
  appId: string;

  start(appId: string): Subject<InternalMessage> {
    this.appId = appId;
    window.addEventListener('message', this.messageHandler.bind(this), {capture: true});
    this.registerApp();
    this.masterSubject = new Subject<InternalMessage>();
    return this.masterSubject;
  }

  private messageHandler(message) {
    this.masterSubject.next(InternalMessage.fromData(JSON.parse(message.data)));
  }

  registerApp() {
    const message = new InternalMessage(this.appId, undefined, InternalMessageCode.Register, undefined);
    this.sendMessageToFrame(message);
  }

  sendMessage(data: any, destApp: string) {
    const message = new InternalMessage(this.appId, destApp, InternalMessageCode.Data, data);
    this.sendMessageToFrame(message);
  }

  private sendMessageToFrame(message: InternalMessage) {
    window.parent.postMessage(JSON.stringify(message), '*');
  }
}

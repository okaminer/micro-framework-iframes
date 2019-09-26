import {Component, OnInit} from '@angular/core';
import {LogsrvService} from './logsrv.service';

import {Subject} from 'rxjs';
import {InternalServerBusService} from 'my-lib';
import {InternalMessage, InternalMessageCode} from 'my-lib';
import {InternalClientBusService} from '../../projects/my-lib/src/lib/internal-client-bus.service';
import {startWith} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './master-app.component.html',
  styleUrls: ['./master-app.component.scss'],
})
export class MasterAppComponent implements OnInit {

  title = 'manager';


  constructor(private serviceBus: InternalServerBusService, private logService: LogsrvService) {
  }
  recievedSubject: Subject<any>;
  currentIframe: HTMLIFrameElement;
  messageToSend = 'my message';
  destApp = 'app1';
  ngOnInit() {

    this.startServiceBus();
    this.hideBackgroundOnLoad('app1');
    this.hideBackgroundOnLoad('app2');
    this.hideBackgroundOnLoad('webuiApp');
    this.hideBackgroundOnLoad('vxFlexFrame');
    this.currentIframe = (<HTMLIFrameElement>document.getElementById('app1'));
  }

  startServiceBus() {
    this.recievedSubject = this.serviceBus.start();
    this.recievedSubject.subscribe(value => this.doStufWithSubject(value), error => console.log('Error receiving message'));
  }


  doStufWithSubject(message: InternalMessage) {
    try {
      this.addLog2('Received from: ' + message.sourceFrame + ' data: ' + message.data);
      const action = JSON.parse(message.data);//{"code":"switch","app":"app2"}
      if (action.code === 'switch') {
        this.switchApp(action.app);
      }
    } catch (e) {
      console.error(e);
    }
  }

  hideBackgroundOnLoad(frameId: string) {
    document.getElementById(frameId).addEventListener('load', function() {
      console.log('loaded');
      document.getElementById(frameId).style.background = 'url(\'\')';
    });
  }

  switchApp(destApp) {
    switch (destApp) {
      case 'app1': {
        this.switchFrames('app1');
        break;
      }
      case 'app2': {
        this.switchFrames('app2');
        break;
      }
      case 'webuiApp': {
        this.switchFrames('webuiApp');
        break;
      }
      case 'vxFlexFrame': {
        this.switchFrames('vxFlexFrame');
        break;
      }
      default: {
        console.error('Can\'t find frame for ' + destApp);
      }

    }
  }

  switchFrames(newFrameId: string) {
    this.currentIframe.style.display = 'none';
    this.currentIframe  = (<HTMLIFrameElement>document.getElementById(newFrameId));
    this.currentIframe.style.display = 'block';
  }



  onClick() {
    const iframe = document.getElementById('webuiApp');
    (<HTMLIFrameElement>iframe).contentWindow.postMessage('message from parent ', '*');
  }

  addLog() {
    this.addLog2('test log');

  }
  addLog2(message: String) {
    this.logService.newLog('got ' + message);
  }

  sendMessage() {
    this.serviceBus.sendMessage(this.messageToSend, this.destApp);
  }
}

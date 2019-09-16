import {Component, OnInit} from '@angular/core';
import {LogsrvService} from './logsrv.service';
import {InternalServerBusService} from './MessageBus/internal-server-bus.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'manager';

  constructor(private serviceBus: InternalServerBusService, private logService: LogsrvService) {
  }
  currentIframe: HTMLIFrameElement;
  ngOnInit() {
    window.addEventListener('message', this.messageHandler.bind(this), { capture: true });
    this.hideBackgroundOnLoad('exampleFrame');
    this.hideBackgroundOnLoad('webuiFrame');
    this.hideBackgroundOnLoad('vxFlexFrame');
    this.currentIframe = (<HTMLIFrameElement>document.getElementById('exampleFrame'));

    // this.serviceBus.start();

  }

  hideBackgroundOnLoad(frameId: string) {
    document.getElementById(frameId).addEventListener('load', function() {
      console.log('loaded');
      document.getElementById(frameId).style.background = "url('')";
    });
  }
  soStuff(sender){
    switch (sender) {
      case 'exampleFrame': {
        this.switchFrames('exampleFrame');
        break;
      }
      case 'webuiFrame': {
        this.switchFrames('webuiFrame');
        break;
      }
      case 'vxFlexFrame': {
        this.switchFrames('vxFlexFrame');
        break;
      }
      default:{
        console.error('Can\'t find frame for ' + sender);
      }

    }
  }

  switchFrames(newFrameId: string){
    this.currentIframe.style.display = 'none';
    this.currentIframe  = (<HTMLIFrameElement>document.getElementById(newFrameId));
    this.currentIframe.style.display = 'block';
  }
  messageHandler(message) {
    this.addLog2('Got message from: ' + message.origin + ' - ' + message.data);
  }


  onClick() {
    const iframe = document.getElementById('webuiFrame');
    (<HTMLIFrameElement>iframe).contentWindow.postMessage('message from parent ', '*');
  }

  addLog(){
    this.addLog2("test log");

  }
  addLog2(message: String) {
    this.logService.newLog('got ' + message);
  }
}

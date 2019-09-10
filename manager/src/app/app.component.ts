import {Component, OnInit} from '@angular/core';
import {LogsrvService} from './logsrv.service';
import {generateExpandoInstructionBlock} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'manager';

  constructor(private logService: LogsrvService) {
  }

  ngOnInit() {
    window.addEventListener('message', this.messageHandler.bind(this), { capture: true });
    document.getElementById('myframe').addEventListener('load', function() {
      console.log('loaded');
      document.getElementById('myframe').style.background = "url('')";
    });
  }

  messageHandler(message) {
    this.addLog2('Got message from: ' + message.origin + ' - ' + message.data);
  }


  onClick() {
    const iframe = document.getElementById('myframe');
    (<HTMLIFrameElement>iframe).contentWindow.postMessage('message from parent ', '*');
  }

  addLog(){
    this.addLog2("test log");

  }
  addLog2(message: String) {
    this.logService.newLog('got ' + message);
  }
}

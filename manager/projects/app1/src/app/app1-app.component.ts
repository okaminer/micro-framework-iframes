import {Component, OnInit} from '@angular/core';
import {InternalMessage} from '../../../my-lib/src/lib/internal-message';
import {InternalClientBusService} from '../../../my-lib/src/lib/internal-client-bus.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app1-app.component.html',
  styleUrls: ['./app1-app.component.css']
})
export class App1AppComponent implements OnInit {
  title = 'app1';
  message = 'App1';
  appId = 'app1';
  listLog = [];
  subjectInternalMessage: Subject<InternalMessage>;
  dataToSend: string;
  destApp: string;
  webuiPage: string;
  constructor(private clientBusService: InternalClientBusService) {
  }

  ngOnInit() {
    this.subjectInternalMessage = this.clientBusService.start(this.appId);
    this.subjectInternalMessage.subscribe(value => this.handleIncomingMessage(value));
  }

  handleIncomingMessage(message: InternalMessage) {
    this.listLog.push(JSON.stringify(message));
  }

  sendMessage() {
    this.clientBusService.sendMessage(this.dataToSend, this.destApp);
  }

  moveToWebUI() {
    this.clientBusService.sendMessage(this.webuiPage, 'webuiApp');
    this.clientBusService.sendMessage('{"code":"switch","app":"webuiApp"}', 'master');

  }
}

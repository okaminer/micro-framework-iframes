import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {InternalMessage} from '../../../my-lib/src/lib/internal-message';
import {InternalClientBusService} from '../../../my-lib/src/lib/internal-client-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app2-app.component.html',
  styleUrls: ['./app2-app.component.css']
})
export class App2AppComponent implements  OnInit {
  title = 'app2';
  message = 'App2';
  appId = 'app2';
  listLog = [];
  subjectInternalMessage: Subject<InternalMessage>;
  dataToSend: string;
  destApp: string;
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

}

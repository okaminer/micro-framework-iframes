import { Component, OnInit } from '@angular/core';
import {LogsrvService} from '../logsrv.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  listLog =[];

  constructor(private logService: LogsrvService) {
  }

  ngOnInit() {
    this.logService.newLogEvent.subscribe(log => this.createNewDiv(log));
  }

  createNewDiv(log: String) {
    this.listLog.push(log);
    // const input = document.createElement('input');
    // // @ts-ignore
    // input.setAttribute('value', log);
    // input.setAttribute('disabled' , String(true));
    // document.getElementById('logcontent').appendChild(input);

  }

}

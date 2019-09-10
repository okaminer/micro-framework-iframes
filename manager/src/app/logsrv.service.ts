import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogsrvService {

  @Output() newLogEvent: EventEmitter<String> = new EventEmitter();
  constructor() { }

  newLog(message: String) {
    this.newLogEvent.emit(message);
  }

}

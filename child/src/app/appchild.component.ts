import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './appchild.component.html',
  styleUrls: ['./appchild.component.scss']
})
export class AppChildComponent   implements OnInit {
  title = 'child';
  message = 'in a minute';
  ngOnInit() {
    window.addEventListener('message', this.messageHandler.bind(this), false);
  }
  messageHandler(message) {
    this.message = 'recieved: ' +  message.data;
    window.parent.postMessage('received your message dork', '*');
  }
}

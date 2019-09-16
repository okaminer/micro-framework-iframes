import {BehaviorSubject, Subject} from 'rxjs';

export class FrameMeta{
  frameId: String;
  subject: BehaviorSubject<object> = new BehaviorSubject([]);

  constructor(frameId: String) {
    this.frameId = frameId;
  }
}






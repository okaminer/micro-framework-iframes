import {BehaviorSubject, Subject} from 'rxjs';
import {InternalMessage} from './internal-message';

export class FrameMeta {

  frameId: String;
  subject: Subject<InternalMessage> = new Subject<InternalMessage>();

  constructor(frameId: String) {
    this.frameId = frameId;
  }
}






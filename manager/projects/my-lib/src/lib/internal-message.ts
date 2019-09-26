
export class InternalMessage {
  sourceFrame: string;
  destFrame: string;
  opcode: InternalMessageCode;
  data; any;


  static fromData(obj: any): InternalMessage {
      return new InternalMessage(obj.sourceFrame, obj.destFrame, obj.opcode, obj.data);
  }

  constructor(sourceFrame: string, destFrame: string, opcode: InternalMessageCode, data: any) {
    this.sourceFrame = sourceFrame;
    this.destFrame = destFrame;
    this.opcode = opcode;
    this.data = data;
  }

  static empty() {
    return undefined;
  }
}

export enum InternalMessageCode {
  Register,
  Data,
}

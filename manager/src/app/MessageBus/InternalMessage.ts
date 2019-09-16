
export class InternalMessage{
  sourceFrame: String;
  destFrame: String;
  opcode: InternalMessageCode;
  data; any;
}

export enum InternalMessageCode {
  Register,
  Data,
}

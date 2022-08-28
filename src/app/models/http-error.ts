export class HttpError {
  status: boolean = false;
  msg?: string;

  constructor(status: boolean, msg: string) {
    this.status = status;
    this.msg = msg;
  }
}

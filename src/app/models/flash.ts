export class Flash {
  public msg?: string;
  public key?: string;

  constructor(msg: string, key: string) {
    this.msg = msg;
    this.key = key;
  }
}

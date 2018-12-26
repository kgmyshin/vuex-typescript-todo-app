export class Todo {
  public id: string;
  public body: string;
  public hasDone: boolean;
  constructor(
    id: string,
    body: string,
    hasDone: boolean = false,
  ) {
    this.id = id;
    this.body = body;
    this.hasDone = hasDone;
  }
}

export class Queue<T> {
  private head: { element: T; next: { element: T; next: unknown } | undefined } | undefined;
  private tail: { element: T; next: { element: T; next: unknown } | undefined } | undefined;
  private _size: number;

  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }

  insert(element: T): void {
    const oldTail = this.tail;
    this.tail = {
      element,
      next: undefined,
    };
    if (oldTail === undefined) {
      this.head = this.tail;
    } else {
      oldTail.next = this.tail;
    }
    ++this._size;
  }

  remove(): T {
    if (this.head === undefined) {
      throw new Error('Cannot remove an element from an empty queue');
    }
    const element = this.head.element;
    this.head = this.head.next as typeof this.head;
    if (this.head === undefined) {
      this.tail = undefined;
    }
    --this._size;
    return element;
  }
}

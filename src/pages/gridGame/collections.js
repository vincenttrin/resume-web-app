export class Queue {
  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  insert(element) {
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

  remove() {
    console.assert(this.head !== undefined, 'Cannot remove an element from an empty queue');
    const element = this.head.element;
    this.head = this.head.next;
    if (this.head === undefined) {
      this.tail = undefined;
    }
    --this._size;
    return element;
  }
}

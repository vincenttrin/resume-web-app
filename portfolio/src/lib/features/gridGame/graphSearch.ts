import { Queue } from './collections';

export type Direction = [number, number];

class Edge<T> {
  from: T | undefined;
  action: Direction | undefined;
  to: T;
  distance: number | undefined;

  constructor(from: T | undefined, action: Direction | undefined, to: T, distance?: number) {
    this.from = from;
    this.action = action;
    this.to = to;
    this.distance = distance;
  }
}

interface Vertex {
  incidences: { action: Direction; child: Vertex }[];
  toString(): string;
}

export function bfs<T extends Vertex>(source: T, isDestination: (vertex: T) => boolean): Edge<T>[] | undefined {
  const backpointers = new Map<string, Edge<T>>();
  const worklist = new Queue<Edge<T>>();
  worklist.insert(new Edge<T>(undefined, undefined, source));
  
  while (worklist.size > 0) {
    const workitem = worklist.remove();
    if (backpointers.has(`${workitem.to}`)) {
      continue;
    }
    backpointers.set(`${workitem.to}`, workitem);
    if (isDestination(workitem.to)) {
      const reversedPath: Edge<T>[] = [];
      let current: Edge<T> | undefined = workitem;
      while (current && current.from !== undefined) {
        reversedPath.push(current);
        current = backpointers.get(`${current.from}`);
      }
      return reversedPath.reverse();
    }
    for (const { action, child } of workitem.to.incidences) {
      worklist.insert(new Edge<T>(workitem.to, action, child as T));
    }
  }
  return undefined;
}

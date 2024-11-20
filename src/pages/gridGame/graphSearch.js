import { Queue } from './collections.js';

let explorationCounter = 0;

class Edge {
  constructor(from, action, to, distance = undefined) {
    this.from = from;
    this.action = action;
    this.to = to;
    this.distance = distance;
  }
}

export function bfs(source, isDestination) {
  const backpointers = new Map();
  const worklist = new Queue();
  worklist.insert(new Edge(undefined, undefined, source));
  while (worklist.size > 0) {
    const workitem = worklist.remove();
    if (backpointers.has(`${workitem.to}`)) {
      continue;
    }
    backpointers.set(`${workitem.to}`, workitem);
    if (isDestination(workitem.to)) {
      const reversedPath = [];
      for (let current = workitem;
        current.from !== undefined;
        current = backpointers.get(`${current.from}`)) {
        reversedPath.push(current);
      }
      return reversedPath.reverse();
    }
    for (const { action, child } of workitem.to.incidences) {
      worklist.insert(new Edge(workitem.to, action, child));
      ++explorationCounter;
    }
  }
  return undefined;
}

export class ExplorationObserver {
  constructor() {
    this.baseline = explorationCounter;
  }

  get explorationCount() {
    return explorationCounter - this.baseline;
  }
}

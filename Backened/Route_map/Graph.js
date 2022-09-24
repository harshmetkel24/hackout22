RouteMap = require('./adjclist.json')
class Node {
    constructor(val, priority) {
        this.val = val
        this.priority = priority
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}


class Graph {
    constructor() {
        this.adjacencyList = {};
        this.AverageSpeedOfBus = 50.0
        this.Initialize()
    }
    Initialize() {
        for (let i in RouteMap) {
            this.addVertex(Number.parseInt(i) + 1)
        }
        for (let i in RouteMap) {
            for (let j in RouteMap[i]) {
                // console.log(j,RouteMap[i][j])
                this.addEdge(Number.parseInt(i) + 1, RouteMap[i][j][0], RouteMap[i][j][1])
            }
        }
    }
    CopyGraph(adjlist) {
        this.adjacencyList = adjlist
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
    }

    // returns shortest path from start to finish
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        let smallest;
        console.log(start, finish)
        for (let vertex in this.adjacencyList) {
            if (vertex == start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            // console.log("smallest = ",smallest)
            if (smallest === finish) {
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    // console.log('\t',"neighbours",nextNode.node)
                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        //updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
            // console.log(nodes)
        }
        // console.log("path = ",path)
        return path.concat(Number.parseInt(smallest)).reverse();
    }

    Get_stops_List(start, finish, wait_time) {
        let shortest_path = this.Dijkstra(start, finish)
        console.log("dijstra's ", shortest_path)
        let nextNode = shortest_path[1]
        let visited = {}
        let stops_list = []
        visited[start] = true
        for (let n in this.adjacencyList[start]) {
            if (this.adjacencyList[start][n].node != nextNode) {
                let curr_time = this.adjacencyList[start][n].weight / this.AverageSpeedOfBus
                console.log(curr_time)
                if (curr_time <= wait_time) {
                    visited[this.adjacencyList[start][n].node] = true
                    stops_list.push(this.adjacencyList[start][n].node)
                    this.DFS(this.adjacencyList[start][n].node, wait_time, curr_time, stops_list, visited)
                }
            }
        }
        return stops_list
    }
    DFS(curr, wait_time, current_time, stops_list, visited) {
        for (let neighbour in this.adjacencyList[curr]) {
            let nextnode = this.adjacencyList[curr][neighbour]
            if (visited[nextnode.node]) continue;
            let distance = nextnode.weight
            let additional_time = distance / this.AverageSpeedOfBus
            // add the bus into the bus list
            if (current_time + additional_time <= wait_time) {
                stops_list.push(nextnode.node)
                visited[nextnode.node] = true
                this.DFS(nextnode.node, wait_time, current_time + additional_time, stops_list, visited)
            }
        }
    }
}


module.exports = Graph
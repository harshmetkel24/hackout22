RouteMap=require('./adjclist.json')
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
        this.AverageSpeedOfBus=50.0
    }
    Initialize()
    {
        for(let i in RouteMap)
        {
            this.addVertex(i+1)
        }
        for(let i in RouteMap)
        {
            for(let j in RouteMap[i])
            {
                this.addEdge(i+1,j)
            }
        }
    }
    CopyGraph(adjlist)
    {
        this.adjacencyList=adjlist
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    // returns shortest path from start to finish
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = []; 
        let smallest;
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
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
        }
        return path.concat(smallest).reverse();
    }

    Get_Buses_List(start,finish,start_time,m_wait_time)
    {
        let shortest_path=this.Dijkstra(start,finish)
        let nextNode=shortest_path[1]
        let visited={}
        let bus_list=[]
        for(let n in this.adjacencyList[start])
        {
            if(this.adjacencyList[start][n].node!=nextNode)
            {
                let curr_time=this.adjacencyList[start][n].weight/this.AverageSpeedOfBus
                DFS(this.adjacencyList[start][n],wait_time,curr_time,bus_list)
            }
        }
    }
    DFS(curr,wait_time,current_time,bus_list)
    {
        for(let neighbour in this.adjacencyList[curr])
        {
            let nextnode=this.adjacencyList[curr][neighbour]
            let distance=nextnode.weight
            let additional_time=distance/this.AverageSpeedOfBus
            // add the bus into the bus list


            if(current_time+additional_time <= wait_time)
            {
                this.DFS(nextnode.node,wait_time,current_time+additional_time,bus_list)
            }
        }
    }
}


let g=new Graph()
g.Initialize()
// const data=require('./Route_map/new_adj_clist.json')

// let mappings=new Array(20)
// for(let i=0;i<20;i++)
// {
//     mappings[i]=new Array(20)
//     for(let j=0;j<20;j++)
//     mappings[i][j]=-1
// }

// let new_data=[]
// let u,v
// for(let x in data)
// {
//     let temp=[]
//     for(let y in data[x])
//     {
//         u=x
//         v=data[x][y]-1
//         if(mappings[u][v]==-1)
//         {
//             mappings[u][v]=10+Math.floor(Math.random()*10)
//             mappings[v][u]=mappings[u][v]
//             temp[y]=[v+1,mappings[u][v]]
//         }
//         else{
//             temp[y]=[v+1,mappings[u][v]]
//         }
//     }
//     new_data[x]=temp
// }
// console.log(new_data)

const data=require('./Route_map/new_bus_list.json')
let new_data=[]
const graph=require('./Route_map/new_adj_clist.json')
for(let i in data)
{
    let start_time=0
    let temp={}
    for(let j in data[i])
    {
        if(j!=0)
        {
            let u = data[i][j-1]-1
            let v=data[i][j]
            let dist=-1
            for(let k in graph[u])
            {
                if(graph[u][k][0]==v)
                {
                    dist=graph[u][k][1]
                    break;
                }
            }
            start_time+=dist/50.0
        }
        temp[data[i][j]]=[j,start_time]
    }
    new_data[i]=temp
}
console.log(new_data)
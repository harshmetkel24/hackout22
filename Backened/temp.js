const data= require('./Route_map/buslist.json')

let newdata=[]
for(let x in data)
{
    temp=[]
    for(let y in data[x])
    {
        temp[y]=[data[x][y],(10+Math.floor(Math.random()*10))]
    }
    newdata[x]=temp
}
console.log(newdata)
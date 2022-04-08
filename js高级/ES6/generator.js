function* generator(){
    const list = [1,2,3];
    for(let i of list){
        yield i;
    }
}


let g = generator()

console.log(g.next())
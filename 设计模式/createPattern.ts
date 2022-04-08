// class Shop {
//     constructor() {

//     }
//     create(name: string) {
//         return new Game(name);
//     }
// }

// class Game {
//     private name: string;
//     constructor(name: string) {
//         this.name = name
//     }

//     init() {
//         console.log('init:' + this.name)
//     }

//     run() {
//         console.log('run:' + this.name)
//     }
// }

// const shop = new Shop();

// const game = new Game('lol');



class Product {
    private name: string;
    constructor(name:string) {
        this.name = name;
    }
    init() {
        console.log('Product init')
    }
}

class Skin {
    private name:string;
    constructor(name:string){
        this.name = name;
    }
    init() {
        console.log('Skin init')
    }
}


class Shop {
    private name:string;
    constructor(name:string){
        this.name = name;
    }
    init() {
        console.log('Skin init')
    }
}
class PackageBuilder {
    private game:string;
    private skin:string;
    constructor(name:string){
    }
}
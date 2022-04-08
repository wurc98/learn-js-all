


class BomEvent {
    constructor(element){
        this.element = element
    }

    addEvent(type,handler){
        if(this.element.addEventListener){
            this.element.addEventListener(type,handler,false)
        } else if(this.element.attachEvent){
            this.element.attachEvent(`on${type}`,function(){
                handler.call(element);
            })
        }else{
            this.element[`on${type}`] = handler;
        }
    }


    removeEvent(type,handler){
        if(this.element.removeEventListener){
            this.element.removeEventListener(type,handler,false)
        }else if(this.element.detachEvent){
            this.element.detachEvent(`on${type}`,handler)
        }else{
            this.element[`on${type}`] = null
        }
    }
}

function stopPropagation(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancleBubble =  true;
    }
}
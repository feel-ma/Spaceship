
class Map{
    constructor(ctx, imgsrc, y){
        this.height = canvas.height
        this.width = canvas.width
        this.x = 0
        this.y=y
        this.ctx= ctx
        this.img= new Image();
        this.img.src=imgsrc;
    }

    draw(){
       /*  let river = new Image();
        river.src = "./images/river.jpg"; */
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    scroll(){
        this.y+=0.5
    }
}

export default Map
class Buff{
    constructor(ctx, imgSrc,x ){
        this.ctx= ctx
        this.x=x;
        this.y= -10;
        this.img= new Image;
        this.img.src=imgSrc;

    }


    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, 30, 30);
      }

    move(){
        this.y+=1
    } 
}

export default Buff


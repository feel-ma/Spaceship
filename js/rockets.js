class Rocket{
    constructor(ctx, imgSrc,x ,y  ){
        this.ctx= ctx
        this.x=x;
        this.y= y;
        this.img= new Image;
        this.img.src=imgSrc;

    }


    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, 20, 20);
      }

    move(){
        this.x+=2
        this.y-=2
    } 
    moveR(){
        this.x-=2
        this.y-=2
    } 
}



export default Rocket
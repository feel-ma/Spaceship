class EProjectile{
    constructor(ctx, imgSrc,x ,y  ){
        this.ctx= ctx
        this.x=x;
        this.y= y;
        this.img= new Image;
        this.img.src=imgSrc;
        this.life=100;

    }


    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, 20, 20);
      }

    move(){
        this.y+=2
    } 
}



export default EProjectile
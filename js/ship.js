class Ship{
    constructor(ctx, imgSrc,  ){
        this.ctx= ctx
        this.x=250;
        this.y= 600;
        this.img= new Image;
        this.img.src=imgSrc;
        this.life=100

    }


    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, 50, 70);
      }


    
}

export default Ship
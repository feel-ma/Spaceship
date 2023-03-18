class Terrestrial{
    constructor(ctx, imgSrc,x){
        this.ctx= ctx
        this.x=x;
        this.y= 0;
        this.img= new Image;
        this.img.src=imgSrc;
        this.widht=50;
        this.height= 70;
        this.life=100;
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.widht, this.height);
      }

    move(){
        this.y+=1
    }

}


export default Terrestrial
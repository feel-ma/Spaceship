class Enemy{
    constructor(ctx, imgSrc,x){
        this.ctx= ctx
        this.x=x;
        this.y= 0;
        this.img= new Image;
        this.img.src=imgSrc;
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, 50, 70);
      }

    moveL(){
        this.x-=1
    }

    moveR(){
        this.x+=1
    }

    moveU(){
        this.y-=1
    }

    moveD(){
        this.y+=1
    }

}

export default Enemy
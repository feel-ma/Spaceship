class Bomb {
  constructor(ctx, imgSrc, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = imgSrc;
    this.c = 0;
    this.e = 0;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, 20, 20);
  }

  move() {
    if (this.c <= 5) {
      this.y += 2;
      this.c++;
    } 
    //else {
      //this.explode();
    //}
  }

  /* explode() {
    for (let i = 0; i < 33; i++) {
      if (this.e == 0)
        this.ctx.drawImage(
          "./images/imgs_explode/img_0.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 1)
        this.ctx.drawImage(
          "./images/imgs_explode/img_1.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 2)
        this.ctx.drawImage(
          "./images/imgs_explode/img_2.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 3)
        this.ctx.drawImage(
          "./images/imgs_explode/img_3.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 4)
        this.ctx.drawImage(
          "./images/imgs_explode/img_4.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 5)
        this.ctx.drawImage(
          "./images/imgs_explode/img_5.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 6)
        this.ctx.drawImage(
          "./images/imgs_explode/img_6.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 7)
        this.ctx.drawImage(
          "./images/imgs_explode/img_7.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 8)
        this.ctx.drawImage(
          "./images/imgs_explode/img_8.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 9)
        this.ctx.drawImage(
          "./images/imgs_explode/img_9.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 10)
        this.ctx.drawImage(
          "./images/imgs_explode/img_10.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 11)
        this.ctx.drawImage(
          "./images/imgs_explode/img_11.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 12)
        this.ctx.drawImage(
          "./images/imgs_explode/img_12.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 13)
        this.ctx.drawImage(
          "./images/imgs_explode/img_13.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 14)
        this.ctx.drawImage(
          "./images/imgs_explode/img_14.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 15)
        this.ctx.drawImage(
          "./images/imgs_explode/img_15.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 16)
        this.ctx.drawImage(
          "./images/imgs_explode/img_16.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 17)
        this.ctx.drawImage(
          "./images/imgs_explode/img_17.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 18)
        this.ctx.drawImage(
          "./images/imgs_explode/img_18.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 19)
        this.ctx.drawImage(
          "./images/imgs_explode/img_19.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 20)
        this.ctx.drawImage(
          "./images/imgs_explode/img_20.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 21)
        this.ctx.drawImage(
          "./images/imgs_explode/img_21.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 22)
        this.ctx.drawImage(
          "./images/imgs_explode/img_22.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 23)
        this.ctx.drawImage(
          "./images/imgs_explode/img_23.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 24)
        this.ctx.drawImage(
          "./images/imgs_explode/img_24.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 25)
        this.ctx.drawImage(
          "./images/imgs_explode/img_25.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 26)
        this.ctx.drawImage(
          "./images/imgs_explode/img_26.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 27)
        this.ctx.drawImage(
          "./images/imgs_explode/img_27.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 28)
        this.ctx.drawImage(
          "./images/imgs_explode/img_28.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 29)
        this.ctx.drawImage(
          "./images/imgs_explode/img_29.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 30)
        this.ctx.drawImage(
          "./images/imgs_explode/img_30.png",
          this.x,
          this.y,
          20,
          20
        );
      else if (this.e == 31)
        this.ctx.drawImage(
          "./images/imgs_explode/img_31.png",
          this.x,
          this.y,
          20,
          20
        );
      else this.c = 0;
    } */
  
}

export default Bomb;

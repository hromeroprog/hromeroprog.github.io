class Circle{
    constructor(x, y , radio, color, vx, vy, c){
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.c = c;
    }

    draw(){
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
		this.c.fillStyle = this.color;
		this.c.fill();
		this.c.stroke();
        this.c.closePath();
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
    }
}
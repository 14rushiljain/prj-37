class Food{
    constructor(){
        this.foodStock=this.lastFed=0;
        this.image=loadImage("images/Milk.png");
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodUpdate){
        this.foodStock=foodUpdate;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock-=1;
        }

    }
    
    display(){
        var x=80,y=100;
        
        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y+=50;
                }
                image(this.image,x,y,50,50);
                x+=30;
            }
        }
    }

    bedroom(){
        // imageMode(CENTER);
        // image(bedroom, 0.5*width, 0.5*height,width, height ); // to fit width
       background(bedroom,550,500,width,height);
    }

    garden(){
        // imageMode(CENTER);
        // image(garden, 0.5*width, 0.5*height, width, height); // to fit width
        background(garden,550,500,width,height);
    }

    washroom(){
        // imageMode(CENTER);
        // image(washroom, 0.5*width, 0.5*height, width, height); // to fit width
        background(washroom,550,500);
    }
}
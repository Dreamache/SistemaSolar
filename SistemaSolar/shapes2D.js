class Line{
    constructor(x1, y1, x2, y2){
        this.points = [];
        this.points.push(new Vector(2, [x1, y1]));
        this.points.push(new Vector(2, [x2, y2]));
        this.color = '#fffcfc';
        this.tr = new Transformation();
		this.faces = [];
		this.faces.push([0,1]);
    }
	draw(){
        beginShape();
        strokeWeight(1);
        stroke(this.color);
        fill(this.color);
		for(let i = 0; i < this.faces.length;i++){
				for(let j = 0; j < this.faces[i].length;j++){
						let idx = this.faces[i][j];
						vertex(
						this.points[idx].get(1),
						this.points[idx].get(2),
					);				
				}
			}
        endShape();
    } 	
    setColor(value){
        this.color = value;
    }	
    translate(dx, dy){
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.translate2D(this.points[i],dx,dy);
        }
    }
    rotation(angle){
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.rotation2D(this.points[i],angle);
        }
    }
}
class Rectangle {
	constructor(x,y,w,h){		
		this.points =[];		
		this.points.push(new Vector(2,[x,y]))
		this.points.push(new Vector(2,[x + w,y]))
		this.points.push(new Vector(2,[x + w,y + h]))
		this.points.push(new Vector(2,[x,y + h]))
		this.color = '#080707';
		this.tr = new Transformation();	
		this.faces = [];
		this.faces.push([0,1,3]);
		this.faces.push([1,2,3])
	}	
	draw(){	
		strokeWeight(0);
		stroke(this.color);
		fill(this.color);		
		beginShape(TRIANGLES);		
			for(let i = 0; i < this.faces.length;i++){
					for(let j = 0; j < this.faces[i].length;j++){
							let idx = this.faces[i][j];
							vertex(
							this.points[idx].get(1),
							this.points[idx].get(2),
						);				
					}
				}

			endShape();
		} 
	setColor(newColor){
		this.color = newColor;
	}
	translate(dx,dy){
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.translate2D(this.points[i], dx, dy);
		} 
	}
	rotation(angle){
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.rotation2D(this.points[i], angle);
		} 
	}
}
class Circle{
	constructor(x,y,r,t){
		var ang = 360/t;
		this.tr = new Transformation();
		this.color = '#080707';		
		this.points =[];
		this.points.push(new Vector(2, [0,0]))
		this.points.push(new Vector(2, [r,0]))	
		for(var i = 2;i < t + 2; i++){
            this.points.push(this.tr.rotation2D(this.points[i - 1], ang));
        }
        for(var i = 0;i < this.points.length; i++){
            this.points[i] = this.tr.translate2D(this.points[i],x,y);
        }
	}
	draw(){		
		strokeWeight(0);
		stroke(this.color);
		fill(this.color);			
		beginShape(TRIANGLES);
		for(var i = 0; i < this.points.length; i++){
            if(i < this.points.length - 2){
               vertex(this.points[0].get(1),this.points[0].get(2))
               vertex(this.points[i+1].get(1),this.points[i+1].get(2))
               vertex(this.points[i+2].get(1),this.points[i+2].get(2))             
			}
		}		
		endShape();
	}	
	setColor(newColor){
		this.color = newColor;
	}
	translate(dx, dy){
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.translate2D(this.points[i], dx, dy);
		} 
	} 
	rotation(angle){
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.rotation2D(this.points[i], angle);
		} 
	}	
}
class Triangle{
	constructor(x1,y1,x2,y2,x3,y3){
		this.points =[];
		this.points.push(new Vector(2, [x1,y1]))
		this.points.push(new Vector(2, [x1 + x2 ,y1 + y2]))
		this.points.push(new Vector(2, [x2 -  x1,y2 + y3]))
		this.points.push(new Vector(2, [x3 + x1,y3 + y1]))
		this.tr = new Transformation();
		this.color = '#fc0808';
		this.faces = [];
		this.faces.push([0,1,2,3]);
		this.faces.push([0,2,3])
	}
	draw(){
		strokeWeight(1);
		stroke(this.color);
		fill(this.color);				
		beginShape(TRIANGLES);
		for(let i = 0; i < this.faces.length;i++){
			for(let j = 0; j < this.faces[i].length;j++){
				let idx = this.faces[i][j];
				vertex(
					this.points[idx].get(1),
					this.points[idx].get(2),
				);				
			}
		}
		endShape(CLOSE);	
	}
	setColor(newColor){
		this.color = newColor;
	}
	translate(kx, ky){
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.translate2D(this.points[i], kx, ky);
			
		} 
	}
	rotation(angle){
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.rotation2D(this.points[i], angle);
		} 
	}
}



	
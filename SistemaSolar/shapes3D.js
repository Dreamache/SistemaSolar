class Plane{
    constructor(x , y , z , w, h ,l){
		this.points = [];
        this.points.push(new Vector(3,[x ,y ,z]));
        this.points.push(new Vector(3,[x + w , y , z]));
        this.points.push(new Vector(3,[x + w , y + h,z +l]));
        this.points.push(new Vector(3,[x , y + h,z + l]));
        this.color = '#fffcfc';
        this.tr = new Transformation();	
		this.faces = [];
		this.faces.push([0,1,2,2,0,3]);
    }	
    draw(){
        beginShape(TRIANGLES);          
			strokeWeight(1);
			stroke(this.color);
			fill(this.color);
			for(let i = 0; i < this.faces.length;i++){
				for(let j = 0; j < this.faces[i].length;j++){
						let idx = this.faces[i][j];
						vertex(
						this.points[idx].get(1),
						this.points[idx].get(2),
						this.points[idx].get(3)
					);				
				}
			}
		   
        endShape(CLOSE)
    }
	setColor(value){
		this.color = value;
	}	
	translate(dx, dy,dz){
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.translate3D(this.points[i],dx,dy,dz);
		}
	}	
	rotation(x,y,z){
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.rotation3Dx(this.points[i],x);
		}
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.rotation3Dy(this.points[i],y);
		}
		for(let i = 0; i < this.points.length; i++){
			this.points[i] = this.tr.rotation3Dz(this.points[i],z);
		}
	}
}

class Parallelogram{
    constructor(x, y, z, w, h, l){
        this.points = [];
        this.points.push(new Vector(3,[x ,y ,z]));
        this.points.push(new Vector(3,[x + w , y ,z]));
        this.points.push(new Vector(3,[x + w ,y + h ,z]));
        this.points.push(new Vector(3,[x ,y + h ,z]));
        this.points.push(new Vector(3,[x ,y ,z - l]));
        this.points.push(new Vector(3,[x +w , y ,z - l]));
        this.points.push(new Vector(3,[x + w ,y + h ,z - l]));
        this.points.push(new Vector(3,[x ,y + h ,z - l]));
		this.faces = [];
		this.faces.push([0,1,3,1,2,3]);
		this.faces.push([4,5,7,5,6,7]);	
		this.faces.push([0,3,7,0,4,7]);
		this.faces.push([1,2,6,1,5,6]);
		this.faces.push([0,1,4,1,4,5]);
		this.faces.push([3,2,7,2,7,6]);     
        this.color = '#fffcfc';
        this.tr = new Transformation();
    }
    draw(){	
        beginShape(TRIANGLES);              
        strokeWeight(1);
        stroke(this.color);
        fill(this.color);		
		for(let i = 0; i < this.faces.length;i++){
			for(let j = 0; j < this.faces[i].length;j++){
				let idx = this.faces[i][j];
				vertex(
				this.points[idx].get(1),
				this.points[idx].get(2),
				this.points[idx].get(3)
				);				
			}
		}	
        endShape(CLOSE);
    }
    setColor(value){
        this.color = value;
    }
    translate(dx, dy,dz){
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.translate3D(this.points[i],dx,dy,dz);
        }
    }
    rotation(x,y,z){
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.rotation3Dx(this.points[i],x);
        }
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.rotation3Dy(this.points[i],y);
        }
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.rotation3Dz(this.points[i],z);
        }
    }
}

class Sphere{
    constructor(x , y , z , r , st , se){
        this.tr = new Transformation();
        this.color = '#fffcfc';
        this.st = st;
        this.se = se;
        this.points = [];
        this.points.push(new Vector(3,[0,0,0]));        
        for(var i = 0; i <= st ;i++){
            var angleSt = Math.PI * (i/st);
            for(var j = 0;j <= se;j++){
                var angleSe = (Math.PI*2) * (j/se);
                this.points.push(this.tr.rotation3Dx(this.tr.rotation3D(new Vector(3,[r,0,0]),angleSt),angleSe));

			}
		}			
        this.translate(x,y,z);
    }
    draw(){
        beginShape(TRIANGLES);      
        strokeWeight(1);
        stroke(this.color);
        fill(this.color);
        var k1, k2;
        for(var i = 0; i < this.st; i++)
        {
            k1 = i * (this.se + 1);     
            k2 = k1 + this.se + 1;      
            for(var j = 0; j < this.se; j++)
            {
                // 2 triangles per sector excluding first and last stacks
                // k1 => k2 => k1+1
                k1++;
                k2++;
                if(i != 0)
                {
                    vertex(this.points[k1].get(1),this.points[k1].get(2),this.points[k1].get(3));
                    vertex(this.points[k2].get(1),this.points[k2].get(2),this.points[k2].get(3));
                    vertex(this.points[k1+1].get(1),this.points[k1+1].get(2),this.points[k1+1].get(3));
                }
        
                // k1+1 => k2 => k2+1
                if(i != (this.st-1))
                {
                    vertex(this.points[k1+1].get(1),this.points[k1+1].get(2),this.points[k1+1].get(3));
                    vertex(this.points[k2].get(1),this.points[k2].get(2),this.points[k2].get(3));
                    vertex(this.points[k2+1].get(1),this.points[k2+1].get(2),this.points[k2+1].get(3));
                }
            }
        }
        endShape(CLOSE);
    }
    setColor(value){
        this.color = value;
    }
    translate(dx, dy, dz){
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.translate3D(this.points[i],dx,dy,dz);
        }
    }
    rotation(x,y,z){
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.rotation3Dx(this.points[i],x);
        }
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.rotation3Dy(this.points[i],y);
        }
        for(let i = 0; i < this.points.length; i++){
            this.points[i] = this.tr.rotation3Dz(this.points[i],z);
        }
    }
}

class Pyramid{
    constructor(x, y, z, w, h, l, hp){
     this.points = [];
     this.points.push(new Vector(3,[x ,y ,z]));
     this.points.push(new Vector(3,[x + w , y , z]));
     this.points.push(new Vector(3,[x + w, y , z + l]));
     this.points.push(new Vector(3,[x , y ,z + l]));
     this.points.push(new Vector(3,[ this.points[2].get(1)/2, h + hp, this.points[2].get(3)/2]));
     this.color = '#fffcfc';
     this.tr = new Transformation();
     this.faces = [];
     this.faces.push([0,1,2,0,2,3]);
     this.faces.push([4,1,2,4,2,3]);
     this.faces.push([4,3,0,4,0,1]);
    }
    draw(){
     beginShape(TRIANGLES);  
     strokeWeight(1);
     stroke(this.color);
     fill(this.color);    
         for(let i = 0; i < this.faces.length;i++){
             for(let j = 0; j < this.faces[i].length;j++){
                 let idx = this.faces[i][j];
                     vertex(
                     this.points[idx].get(1),
                     this.points[idx].get(2),
                     this.points[idx].get(3)
                     );				
             }
         }       
         endShape(CLOSE)
     }
     setColor(value){
         this.color = value;
     }
     translate(dx, dy, dz){
         for(let i = 0; i < this.points.length; i++){
             this.points[i] = this.tr.translate3D(this.points[i],dx,dy,dz);
         }
     }
     rotation(x,y,z){
         for(let i = 0; i < this.points.length; i++){
             this.points[i] = this.tr.rotation3Dx(this.points[i],x);
         }
         for(let i = 0; i < this.points.length; i++){
             this.points[i] = this.tr.rotation3Dy(this.points[i],y);
         }
         for(let i = 0; i < this.points.length; i++){
             this.points[i] = this.tr.rotation3Dz(this.points[i],z);
         }
     }
 }
 
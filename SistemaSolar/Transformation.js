class Transformation {
	dot(a,b){
		if( typeof a == "object" && a instanceof Matrix){
			if( typeof b != "object" || !(b instanceof Matrix)){
				throw"O parametro precisa ser uma matriz"
			}
			if(a.cols != b.rows){
				throw "Matrizes passadas como parametros estao incompativeis"
			}
			let c = new Matrix(a.rows, b.cols)			
			for(let i = 1; i <= a.rows; i++){
				for(let j = 1; j <= b.cols; j++){
					for(let k = 1; k <= a.cols; k++){
						c.set(i,j, a.get(i,k) * b.get(k,j) + c.get(i,j))
					} 
				}
			}			
			return c			
		}else{
				throw"o parametro precisa ser uma matriz.";
			}		
	};
     //-Todas as variacoes possiveis de translacao-
     translate2D(vector,dx,dy){
            this.FirstVector(vector);
            this.SecondVector(vector);
            vector = this.CoordenadaHomogenea(vector);
            let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
            t.set(1,3,dx);
            t.set(2,3,dy);
            return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
     }
     translate3D(vector,dx,dy,dz){
            this.FirstVector(vector);
            this.FirstVector(vector);
            vector = this.CoordenadaHomogenea(vector);
            let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
            t.set(1,4,dx);
            t.set(2,4,dy);
            t.set(3,4,dz);
            return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
     }

    //-Todas as variacoes possiveis de rotacao-
    rotation2D(vector,angle){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,Math.cos(angle));
        t.set(1,2,Math.sin(angle) * -1);
        t.set(2,1,Math.sin(angle));
        t.set(2,2,Math.cos(angle));
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }

    rotation3D(vector,angle){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,Math.cos(angle));
        t.set(1,2,Math.sin(angle) * -1);
        t.set(2,1,Math.sin(angle));
        t.set(2,2,Math.cos(angle));
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    rotation3Dx(vector,angle){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(2,2,Math.cos(angle));
        t.set(3,2,Math.sin(angle));
        t.set(2,3,Math.sin(angle)* -1);
        t.set(3,3,Math.cos(angle));
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    rotation3Dy(vector,angle){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,Math.cos(angle));
        t.set(3,1,Math.sin(angle)* -1);
        t.set(1,3,Math.sin(angle));
        t.set(3,3,Math.cos(angle));
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    rotation3Dz(vector,angle){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,Math.cos(angle));
        t.set(2,1,Math.sin(angle));
        t.set(1,2,Math.sin(angle)* -1);
        t.set(2,2,Math.cos(angle));
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
        
	//-Todas as variacoes possiveis de reflexao-
	reflection2Dx(vector){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(2,2,-1);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }    
    reflection2Dy(vector){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,-1);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    reflection3Dx(vector){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(3,3,-1);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    reflection3Dy(vector){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,-1);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    reflection3Dz(vector){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(2,2,-1);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }

    //-Todas as variacoes possiveis de projecao-
    projection2Dx(vector){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(2,2,0);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    projection2Dy(vector){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,0);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    projection3Dx(vector){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(3,3,0);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    projection3Dy(vector){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,0);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    projection3Dz(vector){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(2,2,0);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }

    //Todas as variacoes de escalonamento-
    scale2Dx(vector,value){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,value);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    scale2Dy(vector,value){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(2,2,value);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    scale3Dx(vector,value){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(3,3,value);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    scale3Dy(vector,value){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,1,value);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    scale3Dz(vector,value){
        this.FirstVector(vector);
        this.FirstVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(2,2,value);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }

    //-Todas as variacoes de cisalhamento-
    shearingx(vector,value){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(1,2,value);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    shearingy(vector,value){
        this.FirstVector(vector);
        this.SecondVector(vector);
        vector = this.CoordenadaHomogenea(vector);
        let t = this.GeradorMatrizZeroUm(new Matrix(vector.size,vector.size));
        t.set(2,1,value);
        return this.CoordenadaCartesiana(this.ConversorMatrizPVector(this.dot(t,vector)));
    }
    FirstVector(vector){
        if(typeof vector != "object" || !(vector instanceof Vector)){
            throw "O parâmetro deve ser um vetor.";
        }
    }
    SecondVector(vector){
        if(vector.size!=2) throw "O vetor precisa ser de 2 dimenções";
    }
    FirstVector(vector){
        if(vector.size!=3) throw "O vetor precisa ser de 3 dimenções";
    }

    //Forma para converter qualquer vetor cartesiano para homogenio
    //1D -> 2D -> 3D -> 4D
    CoordenadaHomogenea(vector){
        let v = new Vector(vector.size+1);
        for(var i = 1;i<= vector.size;i++){
            v.set(i,vector.get(i));
        }
        v.set(vector.size +1,1);
        return v;
    }

    //Forma para converter qualquer vetor homogenio para cartesiano
    //1D <- 2D <- 3D <- 4D
    CoordenadaCartesiana(vector){
        let v = new Vector(vector.size-1);
        for(var i = 1;i<= v.size;i++){
            v.set(i,vector.get(i));
        }
        return v;
    }

    //Funcao para criar uma matriz no formato solve
    ConversorMatrizPVector(a){
        let vector = new Vector(a.cols*a.rows,a.values.slice());
        for(let i = 1;i <= a.rows;i++){
            for(let j = 1;j<= a.cols;j++){
                vector.set(i,a.get(i,j));
            }
        }
        return vector;
    }

    //Converter matriz para vetor
    GeradorMatrizZeroUm(a){
        let c = new Matrix(a.rows,a.cols)
        for(let i = 1;i <= a.rows;i++){
            c.set(i,i,1);
        }
        return c;
    }
}

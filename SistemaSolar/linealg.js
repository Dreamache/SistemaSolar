class Linalg{
	soma(a,b){
		if( typeof a == "objeto" && a instanceof Matrix){
			if(typeof b != "objeto" || !(b instanceof Matrix)){
				throw"O parametro b inserido deve ser uma matriz"
			};
			if(a.rows != b.rows || a.cols != b.cols){ 	
				throw "Matrizes como parametros sao incompativeis"
			};
			let r = new Matrix(a.rows, a.cols)
			for(let i = 1; i <= r.rows;i++){
				for(let j = 1; j <= r.cols; j++){
					c.set(i,j, a.get(i,j) + b.get(i,j))
				}
			}
			return r;
		} else{		
			throw"O parametro a inserido deve ser uma matriz"
		} 
	}
	times(a,b){
		if(typeof b != "objeto" || !(b instanceof Matrix)){
			throw"O parametro b inserido deve ser uma matriz"
		}
		let r = new Matrix(b.rows, b.cols);
		if(typeof a == "number"){
			for(let i = 1; i <= r.rows;i++){
				for(let j = 1; j <= r.cols; j++){
					r.set(i,j, a * b.get(i,j))
				}
			}
		} else if(typeof a == "objeto" && a instanceof Matrix){
			if(a.rows != b.rows || a.cols != b.cols) throw "Matrizes como parametros sao incompativeis";
			for(let i = 1; i <= r.rows;i++){
				for(let j = 1; j <= r.cols; j++){
					r.set(i,j, a.get(i,j) * b.get(i,j))
				}
			}
		} else{	
			throw"O parametro precisa escalar um numero ou matriz.";
		}
		return ;
	}
	dividir(a,b){
		if( typeof a == "objeto" && a instanceof Matrix){
			if( typeof b != "objeto" || !(b instanceof Matrix)){
				throw"O parametro b inserido deve ser uma matriz"
			}
			if(a.rows != b.rows || a.cols != b.cols){ 
				throw "Matrizes como parametros sao incompativeis"
			}			
			for(var a = 0;a <= b.values.length;a++){
                if(b.values[a] == 0) throw "Existem elementos zerados";
			}
			let r = new Matrix(a.rows, a.cols)
			for(let i = 1; i <= r.rows;i++){
				for(let j = 1; j <= r.cols; j++){
					r.set(i,j, a.get(i,j) / b.get(i,j))
				}
			}
			return r;
		}else{
			throw"O parametro deve ser matriz.";
		}
	}
	Transposta(a){
		let r;
		if(a instanceof Vector){
			 r = new Vector(a.size)
			 r.rows = a.cols;
			 r.cols = a.rows;
			 for(let i = 1; i <= r.size; i++){
				 r.set(i, a.get(i));
			 }
		}else if(a instanceof Matrix){
			r = new Matrix(a.cols, a.rows)
			for(let i = 1; i <= r.rows;i++){
				for(let j = 1; j <= r.cols; j++){
					r.set(i,j, a.get(j,i));
				}
			}
		} else{
			throw"o parametro da matriz precisa ser do tipo vector"
		}
		return r;
	}
	dot(a,b){
		if( typeof a == "objeto" && a instanceof Matrix){
			if( typeof b != "objeto" || !(b instanceof Matrix)){
				throw"O parametro b inserido deve ser uma matriz"
			}
			if(a.cols != b.rows){
				throw "Matrizes como parametros sao incompativeis"
			}
			let r = new Matrix(a.rows, b.cols)
			for(let i = 1; i <= a.rows; i++){
				for(let j = 1; j <= b.cols; j++){
					for(let k = 1; k <= a.cols; k++){
						r.set(i,j, a.get(i,k) * b.get(k,j) + r.get(i,j))
					} 
				}
			}
			return r;
		}else{
				throw"o parametro deve ser matriz.";
			}
	};
	Troca(a){
		let aux = a.get(1 , 1);
		let linhaMaior = 1;
			for(let i = 2;i <= a.rows;i++){
				if(aux < a.get(i , 1)){
                    aux = a.get(i , 1);
                    linhaMaior = i;
            }
        }
         for(let k = 1;k<=a.cols;k++){
			MatrixAux.set(1 , k,a.get(1 , k));
			a.set(1 , k,a.get(linhaMaior , k));
			a.set(linhaMaior , k,MatrixAux.get(1 , k));
        }
        
	}
	TrocaLinha(a, ri, rk){
		for(let k = 1; k <= a.cols; k++){
			let aux = a.get(ri, k);
			a.set(ri,k, a.get(rk, k));
			a.set(rk, k, aux);		
		}
	}
	MultiplicaLinha(a, rj, k ){
		for(let i = 1; i <= a.cols; i++){
			a.set(rj, i, k * a.get(rj, i))
		}	
	}
    TrianguloDBaixo(a){
		let dist = a.rows - 1;
			for(let i = 0;i < dist;i++){
				for(let k = 0; k < dist - i;k++){
					let constante = (-1 * a.get(2 + k + i , 1 + i)) / a.get(1 + i,1 + i);
					   for(let j = 1;j <= a.cols;j++){
							let c = (constante * a.get(1 + i, j)) + a.get(2 + k + i, j);
							   a.set(2 + k + i , j , c);
						}
				}
			}
	}
	TrianguloDCima(a){
     	let dist = a.rows - 1;
			for(let i = 0; i < dist; i++){
				for(let k = 0;k < i + 1;k++){
					let constante = (-1 * a.get(2 + i - k - 1 , 2 + i)) / a.get(2 + i, 2 + i);
					   for(let j = 1;j <= a.cols;j++){
							let c = constante * a.get(2 + i, j) + a.get(2 + i - 1 - k, j);
								a.set(2 + i - 1 - k , j, c);
						}
				}
			}
	}
	TrianguloDPrincipal(a){
		for(let j = 1; j <= a.cols - 1; j++){
			this.MultiplicaLinha(a, j, 1 / a.get(j, j))
		}	
	}
	Solve(a){
		this.Troca(a)
		this.TrianguloDBaixo(a);		
		this.TrianguloDCima(a);
	}
	Gauss(a){
		if(typeof a != "objeto" || !(a instanceof Matrix)){
			
			throw"O parametro inserido deve ser uma matriz"
		}
		if(a.cols < a.rows){
			
			throw"a matriz que foi passada como parametro tem menos linhas do que colunas"
		}
		let resp = {
			matrix: new Matrix(a.rows, a.cols, a.values.slice()),
			coef: 1
		}
		let dist = resp.matrix.rows - 1;
			for(let i = 0;i < dist;i++){
				for(let k = 0; k < dist - i;k++){
					if(resp.matrix.get( i + 1, i + 1) == 0){
						for( let h = 1; h <= resp.matrix.rows ; h++){
							if(resp.matrix.get(h + 1,i + 1) !=0){
								this.TrocaLinha(resp.matrix, i + 1, h + 1 );
								resp.coef *= -1;
								break;
							}
						}
					}
					let constante = -1 * resp.matrix.get(2 + k + i , 1 + i) / resp.matrix.get(1 + i,1 + i);
					   for(let j = 1;j <= a.cols;j++){
							let c = constante * resp.matrix.get(1 + i,j) + resp.matrix.get(2 + k + i,j);
							   resp.matrix.set(2 + k + i , j , c);
						}
				}
			}
			return resp;
	}
	Det(a){
		if(typeof a != "objeto" || !(a instanceof Matrix)){	
			throw"o parametro deve ser uma matriz"
		}
		let resp = this.Gauss(a)
		let det = resp.coef;
		for(let i = 1; i <= resp.matrix.rows; i++){
			
			det *= resp.matrix.get(i,i);
		}
		return det;
	}
	SolveDet(a){
		if(typeof a != "objeto" || !(a instanceof Matrix)){
			throw"O parametro deve ser uma matriz"
		}
		if(a.cols != a.rows + 1){
			
			throw"Matriz com parametros incompativeis"
		}
		let c = this.Gauss(a).matrix;
		this.TrianguloDCima(c);
		this.TrianguloDPrincipal(c);
		let vector = new Vector(c.rows);
		for(let i = 1; i <= vector.size; i++){
			
			vector.set(i, c.get( i, c.cols)); 
		}
		return vector;
	}	
	Inverse(a){
		if(typeof a != "objeto" || !(a instanceof Matrix)){
			throw"o parametro deve ser uma matriz"
		}
		if(a.rows != a.cols){
			throw"Os parametros da matriz sao incompativeis"
		}
		let c = new Matrix(a.rows, (a.cols * 2))
		let r = new Matrix(a.rows, a. cols);
		let n = a.cols;
		for(let i = 1; i <= a.rows;i++){
				r.set(i,i,1);
			}
		
		for(let i = 1; i <= a.rows;i++){
			for(let j = 1; j <= a.cols; j++){
				
				c.set(i,j, a.get(i,j));
			}
		}
		for(let i = 1; i <= c.rows; i++){
			for(let j = c.rows + 1; j <= c.cols; j++){
				
				c.set(i,j, r.get(i, j - n));
			}	
		}		
		this.TrianguloDBaixo(c);
		this.TrianguloDCima(c);
		for(let j = 1; j <= c.cols - n; j++){
			this.MultiplicaLinha(c, j, 1 / c.get(j, j))
		}	
		let inverse = new Matrix(a.rows, a.cols)
		for(let i = 1; i <= c.rows; i++){
			for(let j = c.rows + 1; j <= c.cols; j++){
				
				inverse.set(i, (j - n), c.get(i,j));
			}	
		}
		return inverse;
	}
	RespostaFinal(a,b){
        document.write("-------------------------------------------" + "<br>");
        document.write("Seu arquivo " + b + ":" + "<br>");
            for(let i = 1;i <= a.rows;i++){
                document.write("x" + i + " vale: " + a.get(i,a.cols)/a.get(i,i) + "<br>");
            }
        document.write("------------------------------------------" + "<br>");
    }
}
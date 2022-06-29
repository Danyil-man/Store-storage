import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { 

  }
  postProduct(data: any){
    return this.http.post<any>("http://localhost:5000/products", data)
  }
  getProduct(){
    return this.http.get<any>("http://localhost:5000/products")
  }
  updateProduct(data:any, id : number){
    return this.http.put<any>(`http://localhost:5000/products/${id}`, data)
  }
  deleteProducr(id : number){
    return this.http.delete<any>(`http://localhost:5000/products/${id}`)
  }
}

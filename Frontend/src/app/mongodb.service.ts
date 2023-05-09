import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




let baseUrl = 'http://localhost:8080/api/assembly_order';

@Injectable({
  providedIn: 'root'
})
export class MongoClientService {
  constructor(private http: HttpClient) { }
  
  setBaseUrl(url:any){
    baseUrl = url
  }
  
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  get(id: any, data: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/${data}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}

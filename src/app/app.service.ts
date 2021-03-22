import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AppService {
     serverUrl = 'http://localhost:3000/';
     addbookmark = 'addbookmark';
     search = 'search';
     getbookmark = 'getbookmark';
     getrecent = 'getrecent';
    constructor(private http: HttpClient) { }
    GetBookmarks(){
        return this.http.get(`${this.serverUrl}${this.getbookmark}`);
    }
    GetRecents(){
        return this.http.get(`${this.serverUrl}${this.getrecent}`);
    }
    Search(data:any){
        return this.http.post(`${this.serverUrl}${this.search}`,data);
    }
    AddBookmark(data:any){
        return this.http.post(`${this.serverUrl}${this.addbookmark}`,data);
    }
    
}
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyDictionary';
  recent = [];
  bookmarks = [];
  word:any;
  meaning= new Array<any>();
  isBookmarkCompleted = false;
  wordNotFound = false;
  constructor(private appService:AppService){
    var appservice = new AppService();
  }
  ngOnInit(){
    this.getBookmarks();
    this.getrecents();
  }
  Search(){
    this.isBookmarkCompleted = false;
    this.wordNotFound = false;
    this.meaning = [];
    if(this.word != null && this.word != undefined){
      this.appService.Search({'word':this.word}).subscribe((data:any)=>{
        
        if(data["response"]["Message"] != null || data["response"]["Message"] != undefined){
          this.wordNotFound = true;
        }else{
          let responseMeaning = data["response"]["MEANINGS"];
          for (const key in responseMeaning) {
           
              this.meaning.push(responseMeaning[key]);
           
          }
        }
      
       this.getrecents();
            });
    }
    
  }
  getBookmarks(){
    this.appService.GetBookmarks().subscribe((data:any)=>{
      this.bookmarks = data["bookmarks"];
    });
  }
  getrecents(){
    this.appService.GetRecents().subscribe((data:any)=>{
      this.recent = data["recent"];
      this.recent.reverse();
    });
  }
  bookmarkSelected(word:any){
    this.word = word;
    this.Search();
    this.getBookmarks();

  }
  recentSelected(word:any){
    this.word = word;
    this.Search();
  }
  updateBookmark(){
    if(this.word!= null || this.word!= undefined){
      this.appService.AddBookmark({'word':this.word}).subscribe(()=>{
        this.isBookmarkCompleted = true;
       });
       this.getBookmarks();
    }
   
  }
}

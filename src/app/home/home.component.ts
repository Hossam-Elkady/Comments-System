import { Component, OnInit } from '@angular/core';
import { CommentsDBService } from '../comments-db.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contents: any[] = [];

  txt = document.getElementById('txt');

  minCommentsNumber: number = 5;

  start: any;

  counter: any;

  constructor(private _CommentsDBService: CommentsDBService) { }

  ngOnInit(): void {
    this.getComments(); //gets all comment from database
    this.countingComments(); // get the number of all comments exists in databse & *it's my solution for tip #1 in Task*
  }

  countingComments() {
    this._CommentsDBService.getCommentsNumber().subscribe((res) => {
      this.counter = res;
    });
  }



  getText(e: any) {
    let timePosted = new Date();
    let reply: Comment = new Comment(e.target.value, timePosted); //pass the text and the time the comment was posted to the database
    if (!e.target.value) {
      return;
    }
    this._CommentsDBService.postComment(reply).subscribe((res) => {
      let newComments: Comment[] = this.contents;
      newComments.push(reply); //push the last comment to the database
      this.display(newComments); //display last version of database without fetching the comments from database again to save resources
      e.target.value = '';
      this.minCommentsNumber = 5;
      this.counter++;
      this.counterUpdating();
    });
  }

  //update the number of comments in database
  counterUpdating() {
    this._CommentsDBService.updateCounter(this.counter).subscribe((res) => {
      console.log(res);
    });
  }

  //fetch comments from database
  getComments() {
    this._CommentsDBService.getAllComments().subscribe((e) => {
      this.display(e);
    });
  }

  //display fetched comments
  display(e: any[]) {
    this.contents = e;
    this.contents.sort((x, y) => +new Date(y.time) - +new Date(x.time));

    for (let i = 0; i < e.length; i++) {
      let startDate = new Date(e[i].time);
      let currentDate = new Date();
      let timePased = currentDate.getTime() - startDate.getTime();
      let minitusPassed = Math.floor(timePased / (1000 * 60));
      let hoursPassed = Math.floor(minitusPassed / 60);
      let DaysElapsed = Math.floor(timePased / (1000 * 3600 * 24));
      if (DaysElapsed) {
        e[i].timePassed = `${DaysElapsed} Days ago`;
      } else {
        if (hoursPassed) {
          e[i].timePassed = `${hoursPassed} hours ago`;
        } else {
          e[i].timePassed = `${minitusPassed} minutes ago`;
        }
      }
    }
  }

  //show less comments
  showLess() {
    this.minCommentsNumber = 5;
  }

  //show more comments
  loadMore() {
    this.minCommentsNumber += 5;
    if (this.minCommentsNumber > this.counter) {
      this.minCommentsNumber = this.counter;
    }
  }
}

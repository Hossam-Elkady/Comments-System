import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './models/comment.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentsDBService {
  constructor(private _http: HttpClient) {}

  //fetch comments from database
  getAllComments() {
    return this._http
      .get(
        `https://skilled-tech-comments-default-rtdb.europe-west1.firebasedatabase.app/comments.json`
      )
      .pipe(
        map((e: any) => {
          const response: Comment[] = [];
          for (const key in e) {
            if (e.hasOwnProperty(key)) {
              response.push({ ...e[key], id: key });
            }
          }
          return response;
        })
      );
  }

  //get comments number from specific column from database
  getCommentsNumber() {
    return this._http.get(
      `https://skilled-tech-comments-default-rtdb.europe-west1.firebasedatabase.app/counter.json`
    );
  }

  //updating counter
  updateCounter(n: number) {
    return this._http.put(
      `https://skilled-tech-comments-default-rtdb.europe-west1.firebasedatabase.app/counter.json`,
      n
    );
  }

  //post comment in database
  postComment(comment: Comment) {
    return this._http.post(
      `https://skilled-tech-comments-default-rtdb.europe-west1.firebasedatabase.app/comments.json`,
      comment
    );
  }
}

export class Comment {
  userName: string = 'user name';
  commentText: string = '';
  userimage: string = `https://www.pngfind.com/pngs/m/93-938050_png-file-transparent-white-user-icon-png-download.png`;
  time: Date;
  timePassed?:string;
  constructor(commentText: string, time: Date) {
    this.commentText = commentText;
    this.time = time;
  }
}


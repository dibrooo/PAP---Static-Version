export class News {
  id: Number;
  content: String;
  date: Date;
  imageUrl: String;
  title: String;

  constructor(
    id: Number,
    content: String,
    date: Date,
    imageUrl: String,
    title: String
  ) {
    this.id = id;
    this.content = content;
    this.date = date;
    this.imageUrl = imageUrl;
    this.title = title;
  }
}

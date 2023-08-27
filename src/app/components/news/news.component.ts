import { Component, OnInit } from '@angular/core';

import { News } from 'src/app/shared/classes/new';
import { NewsService } from './../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News[];

  constructor(private newsService: NewsService) {
    this.news = [];
  }

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe({
      next: (data: News[]) => {
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.news = data;
      },

      error: () => {
        console.log('error');
      },
    });
  }
}

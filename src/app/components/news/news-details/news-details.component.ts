import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/shared/classes/new';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  news!: News;
  news_list: News[];

  constructor(private route: ActivatedRoute, private newsService: NewsService) {
    this.news_list = [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.newsService.getNewsById(+id).subscribe({
        next: (data: News) => {
          this.news = data;
        },

        error: () => {
          console.log('error');
        },
      });

      this.newsService.getAllNews().subscribe({
        next: (data: News[]) => {
          const filteredNews = data.filter((item) => item.id !== +id);
          this.news_list = filteredNews.slice(0, 3);
        },

        error: () => {
          console.log('error');
        },
      });
    }
  }
}

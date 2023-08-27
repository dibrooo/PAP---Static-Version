import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailService } from 'src/app/services/email.service';
import { News } from 'src/app/shared/classes/new';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('header', { read: ElementRef }) headerEl?: ElementRef;
  @ViewChild('snackbar', { read: ElementRef }) snackbarEl?: ElementRef;
  @ViewChild('emailButton', { read: ElementRef }) emailButtonEl?: ElementRef;
  emailForm!: FormGroup;
  snackbarMessage: string;
  news: News[];
  main_new?: News;
  main_new_id: Number;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private newsService: NewsService
  ) {
    this.snackbarMessage = '';
    this.news = [];
    this.main_new_id = 3;
  }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        this.headerEl?.nativeElement.classList.remove('header-transparent');
      } else {
        this.headerEl?.nativeElement.classList.add('header-transparent');
      }
    });

    this.emailForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.maxLength(500)]],
    });

    this.newsService.getNewsById(this.main_new_id).subscribe({
      next: (data: News) => {
        this.main_new = data;
      },

      error: () => {
        console.log('error');
      },
    });

    this.newsService.getAllNews().subscribe({
      next: (data: News[]) => {
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const filteredNews = data.filter(
          (item) => item.id !== this.main_new_id
        );
        this.news = filteredNews.slice(0, 3);
      },

      error: () => {
        console.log('error');
      },
    });
  }

  sendEmail(): void {
    if (this.emailForm.invalid) {
      return;
    }

    const { name, subject, body } = this.emailForm.value;

    this.emailButtonEl!.nativeElement.innerText = 'A enviar...';
    this.emailButtonEl!.nativeElement.disabled = true;

    this.emailService.sendEmail(name, subject, body).subscribe({
      next: () => {
        console.log('next');

        this.snackbarMessage = 'Email enviado com sucesso!';

        this.snackbarEl!.nativeElement.classList.add('show');
        setTimeout(() => {
          this.snackbarEl!.nativeElement.classList.remove('show');
        }, 3000);

        this.emailButtonEl!.nativeElement.innerText = 'Enviar';
        this.emailButtonEl!.nativeElement.disabled = this.emailForm.invalid;
      },

      error: () => {
        console.log('error');

        this.snackbarMessage = 'Ocorreu um erro ao enviar!';

        this.snackbarEl!.nativeElement.classList.add('show');
        setTimeout(() => {
          this.snackbarEl!.nativeElement.classList.remove('show');
        }, 3000);

        this.emailButtonEl!.nativeElement.innerText = 'Enviar';
        this.emailButtonEl!.nativeElement.disabled = this.emailForm.invalid;
      },
    });
  }
}

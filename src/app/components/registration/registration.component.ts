import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailService } from 'src/app/services/email.service';

// const sampleData = {
//   fullName: 'João Silva',
//   dateOfBirth: '1995-08-15',
//   nationality: 'Portuguesa',
//   placeOfBirth: 'Ponta Delgada',
//   citizenCard: '12345678-9-AB0',
//   fiscalNumber: '123456789',
//   email: 'exemplo@gmail.com',
//   educationLevel: '12º Ano (Completo)',
//   address: {
//     street: 'Rua Principal',
//     complement: 'Apt 101',
//     locality: 'Arrifes',
//     municipality: 'Ponta Delgada',
//     postalCode: '1234-567',
//     country: 'Portugal',
//     mobilePhone: '123 456 789',
//     otherPhone: '987 654 321',
//   },
//   father: {
//     fatherFullName: 'António Silva',
//     fatherProfession: 'Engenheiro',
//     fatherEducationLevel: 'Licenciatura ou Superior',
//   },
//   mother: {
//     motherFullName: 'Maria Silva',
//     motherProfession: 'Professora',
//     motherEducationLevel: 'Licenciatura ou Superior',
//   },
//   courseChoices: {
//     firstChoice: 'Técnico/a de Apoio à Gestão',
//     secondChoice: 'Técnico/a de Ação Educativa',
//     thirdChoice: 'Técnico/a de Eletrónica, Automação e Computadores',
//   },
//   gdprConsent: true,
//   documentUpload: '',
// };

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  /** Current tab the user is */
  currentTab: number;
  registrationForm!: FormGroup;
  snackbarMessage: string;
  @ViewChild('snackbar', { read: ElementRef }) snackbarEl?: ElementRef;
  @ViewChild('submitButton', { read: ElementRef }) submitButtonEl?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService
  ) {
    /** Current tab is set to be the first tab (0) */
    this.currentTab = 0;
    this.snackbarMessage = '';
  }

  ngOnInit(): void {
    /** Display the current tab */
    this.showTab(this.currentTab);

    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      citizenCard: [
        '',
        [Validators.required, Validators.pattern(/^\d{8}-\d-[A-Z]{2}\d$/)],
      ],
      fiscalNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      educationLevel: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        complement: ['', Validators.required],
        locality: ['', Validators.required],
        municipality: ['', Validators.required],
        postalCode: [
          '',
          [Validators.required, Validators.pattern(/^\d{4}-\d{3}$/)],
        ],
        country: ['', Validators.required],
        mobilePhone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{3}[-\s]?\d{3}[-\s]?\d{3}$/),
          ],
        ],
        otherPhone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{3}[-\s]?\d{3}[-\s]?\d{3}$/),
          ],
        ],
      }),
      father: this.formBuilder.group({
        fatherFullName: ['', Validators.required],
        fatherProfession: ['', Validators.required],
        fatherEducationLevel: ['', Validators.required],
      }),
      mother: this.formBuilder.group({
        motherFullName: ['', Validators.required],
        motherProfession: ['', Validators.required],
        motherEducationLevel: ['', Validators.required],
      }),
      courseChoices: this.formBuilder.group({
        firstChoice: ['', Validators.required],
        secondChoice: ['', Validators.required],
        thirdChoice: [''],
      }),
      gdprConsent: [false, Validators.requiredTrue],
      documentUpload: [''],
      submission: [false, Validators.requiredTrue],
    });

    // this.registrationForm.patchValue(sampleData);
  }

  /**
   * This function will display the specified tab of the form...
   * @param n - Number of the tab that user is
   * */
  showTab(n: number): void {
    var x = document.getElementsByClassName(
      'tab'
    ) as HTMLCollectionOf<HTMLElement>;
    x[n].style.display = 'flex';

    /** Fix the Previous/Next buttons: */
    if (n === 0) {
      document.getElementById('prevBtn')!.style.display = 'none';
    } else {
      document.getElementById('prevBtn')!.style.display = 'inline';
    }

    if (n === x.length - 1) {
      document.getElementById('nextBtn')!.style.display = 'none';
    } else {
      document.getElementById('nextBtn')!.style.display = 'inline';
    }

    /** Run a function that displays the correct step indicator: */
    this.fixStepIndicator(n);
  }

  /**
   * This function will figure out which tab to display
   * @param n - Number of the tab that user is
   */
  nextPrev(n: number): void | boolean {
    var x = document.getElementsByClassName(
      'tab'
    ) as HTMLCollectionOf<HTMLElement>;

    /** Exit the function if any field in the current tab is invalid */
    if (n == 1 && !this.validateForm()) return false;

    /** Hide the current tab */
    x[this.currentTab].style.display = 'none';

    /** Increase or decrease the current tab by 1 */
    this.currentTab = this.currentTab + n;

    /** If you have reached the end of the form */
    if (this.currentTab >= x.length) {
      /** The form gets submitted */
      return false;
    }

    /** Otherwise, display the correct tab */
    this.showTab(this.currentTab);
  }

  /**
   * This function will change the tab to a specific one
   * @param n - Tab that user want to go
   */
  changeTab(n: number): void | boolean {
    var x = document.getElementsByClassName(
      'tab'
    ) as HTMLCollectionOf<HTMLElement>;

    /** Exit the function if any field in the current tab is invalid */
    if (this.currentTab < n && !this.validateForm()) return false;

    /** Hide the current tab */
    x[this.currentTab].style.display = 'none';

    /** Increase or decrease the current tab by 1 */
    this.currentTab = n;

    /** Otherwise, display the correct tab */
    this.showTab(this.currentTab);
  }

  /**
   * This function deals with validation of the form fields
   */
  validateForm() {
    var x,
      y,
      i,
      valid = true;

    x = document.getElementsByClassName('tab');
    y = x[this.currentTab].getElementsByTagName('input');

    this.registrationForm.markAllAsTouched();

    /** A loop that checks every input field in the current tab */
    for (let i = 0; i < y.length; i++) {
      /** If a field is empty */
      if (y[i].value == '') {
        /** Add an "invalid" class to the field */
        y[i].className += ' invalid';

        /** And set the current valid status to false */
        valid = false;
      }
    }

    /** If the valid status is true, mark the steps as finished and valid */
    if (valid) {
      document.getElementsByClassName('stepper-item')[
        this.currentTab
      ].className += ' finish';
    }

    /** Return the valid status */
    return valid;
  }

  /**
   * This function removes the "active" class of all steps...
   * @param n - Number of the tab that user is
   * */
  fixStepIndicator(n: number): void {
    var i,
      x = document.getElementsByClassName('stepper-item');
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('active');
    }

    /** Adds the "active" class to the current step */
    x[n].classList.add('active');
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.currentTab = 0;
    this.showTab(this.currentTab);
  }

  submitForm(): void {
    console.log(this.registrationForm.valid);

    if (this.registrationForm.valid) {
      this.submitButtonEl!.nativeElement.innerText = 'A enviar...';
      this.submitButtonEl!.nativeElement.disabled = true;

      const name = this.registrationForm.get('fullName')!.value;
      const formValueJsonString = JSON.stringify(this.registrationForm.value);

      this.emailService
        .sendEmail(name, 'Inscrição Submetida', formValueJsonString)
        .subscribe({
          next: () => {
            this.snackbarMessage = 'Inscrição enviada com sucesso!';

            this.snackbarEl!.nativeElement.classList.add('show');
            setTimeout(() => {
              this.snackbarEl!.nativeElement.classList.remove('show');
            }, 3000);

            this.submitButtonEl!.nativeElement.innerText = 'Submeter';
            this.submitButtonEl!.nativeElement.disabled =
              this.registrationForm.invalid;
          },

          error: () => {
            this.snackbarMessage = 'Ocorreu um erro ao enviar!';

            this.snackbarEl!.nativeElement.classList.add('show');
            setTimeout(() => {
              this.snackbarEl!.nativeElement.classList.remove('show');
            }, 3000);

            this.submitButtonEl!.nativeElement.innerText = 'Submeter';
            this.submitButtonEl!.nativeElement.disabled =
              this.registrationForm.invalid;
          },
        });
    }
  }
}

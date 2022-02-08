import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataTransfer } from '../services/dataTransfer.service';

@Component({
  selector: 'app-form-validate',
  templateUrl: './form-validate.component.html',
  styleUrls: ['./form-validate.component.css'],
})
export class FormValidateComponent implements OnInit {
  countries: Array<any> = [
    { value: 'India', viewValue: 'India' },
    { value: 'USA', viewValue: 'USA' },
    { value: 'Australia', viewValue: 'Australia' },
  ];
  languages: Array<any> = [
    { value: 'English', name: 'Englsih', isSelected: false },
    { value: 'Hindi', name: 'Hindi', isSelected: false },
    { value: 'Telugu', name: 'Telugu', isSelected: false },
  ];
  // languages: Array<any> = ['English', 'Hindi', 'Telugu'];
  isCheck: boolean = true;
  selectedLanguageArray: Array<string> = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataTransfer: DataTransfer
  ) {}
  profileForm: FormGroup = this.formBuilder.group({
    userIdFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    countryControl: new FormControl('', Validators.required),
    zipCodeFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]*$'),
    ]),
    gender: new FormControl('', [Validators.required]),
    //this.languages.map((x) => !1)
    languageFormControl: this.formBuilder.array([], Validators.required),
  });
  ngOnInit(): void {}
  selectedLanguage: string = '';
  onChange() {
    console.log(this.languages);
  }
  formDetails: Array<object> = [];
  submitForm() {
    this.profileForm.reset();
  }
  saveForm() {
    this.selectedLanguage = '';
    this.selectedLanguageArray = [];
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i].isSelected === true) {
        this.selectedLanguage += this.languages[i].value + ' ';
        this.selectedLanguageArray.push(this.languages[i].value);
      }
    }

    if (this.profileForm.valid) {
      console.log('Profile form data :: ', this.profileForm.value);
      this.formDetails.push({
        userId: this.profileForm.value.userIdFormControl,
        name: this.profileForm.value.nameFormControl,
        email: this.profileForm.value.emailFormControl,
        country: this.profileForm.value.countryControl,
        gender: this.profileForm.value.gender,
        languageString: this.selectedLanguage,
        language: this.profileForm.value.languageFormControl,
        // id: this.dataTransfer.lengthofArray,
        isCheck: this.isCheck,
      });
      this.formDetails.forEach((e) => {
        console.log(e);
      }); //console.log(this.formDetails[0]);
      //this.dataTransfer.updateDetails({});
      this.dataTransfer.updateDetails({
        userId: this.profileForm.value.userIdFormControl,
        name: this.profileForm.value.nameFormControl,
        email: this.profileForm.value.emailFormControl,
        country: this.profileForm.value.countryControl,
        gender: this.profileForm.value.gender,
        languageString: this.selectedLanguage,
        language: this.profileForm.value.languageFormControl,
        // id: this.dataTransfer.lengthofArray,
        isCheck: this.isCheck,
      });
      this.dataTransfer.languageArray = this.selectedLanguageArray;
      this.router.navigate(['/database']);
    }
  }
  goToPage(pageName: string): void {
    this.router.navigate(['/database']);
  }
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.profileForm.get(
      'languageFormControl'
    ) as FormArray;
    console.log(checkArray);
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { DataTransfer } from '../services/dataTransfer.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  RequiredValidator,
  FormArray,
} from '@angular/forms';
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css'],
})
export class DatabaseComponent implements OnInit {
  lengthOfArray: number = 0;
  selectedLanguageArray: Array<string> = [];
  countries: Array<any> = [
    { value: 'India', viewValue: 'India' },
    { value: 'USA', viewValue: 'USA' },
    { value: 'Australia', viewValue: 'Australia' },
  ];
  languages: Array<any> = [
    [
      { value: 'English', name: 'Englsih', isSelected: false },
      { value: 'Hindi', name: 'Hindi', isSelected: false },
      { value: 'Telugu', name: 'Telugu', isSelected: false },
    ],
  ];
  // detailsToBeStored: Array<any> = [];
  detailsToBeStored: [
    {
      userId: string;
      name: string;
      email: string;
      country: string;
      gender: string;
      languageString: string;
      language: Array<string>;
      id: number;
      isCheck: boolean;
    }
  ] = [
    {
      userId: '',
      name: '',
      email: '',
      country: '',
      gender: '',
      languageString: '',
      language: [],
      id: 0,
      isCheck: false,
    },
  ];
  //ShowSave: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataTransfer: DataTransfer,
    private router: Router
  ) {}
  formArray: Array<any> = [
    this.formBuilder.group({
      userIdFormControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
      nameFormControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.pattern('[a-zA-Z]+'),
      ]),
      emailFormControl: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      countryFormControl: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      genderFormControl: [{ value: '', disabled: true }, [Validators.required]],
      // this.formBuilder.array([], Validators.required),
      languageFormControl: this.formBuilder.array([], Validators.required),
      // languageFormControl: this.formBuilder.array[
      //   { value: [], disabled: true },
      //   [Validators.required],
      // ],
    }),
  ];

  ngOnInit(): void {
    this.formArray[0].disable();
    // this.detailsToBeStored = this.dataTransfer.details;
    for (let i = 1; i < this.dataTransfer.details.length; i++) {
      this.languages.push([
        { value: 'English', name: 'Englsih', isSelected: false },
        { value: 'Hindi', name: 'Hindi', isSelected: false },
        { value: 'Telugu', name: 'Telugu', isSelected: false },
      ]);
      console.log(this.languages.length);
      this.detailsToBeStored[i] = this.dataTransfer.details[i];
      this.detailsToBeStored[i].id = i;
      // this.selectedLanguageArray = [];
      // this.selectedLanguageArray = this.dataTransfer.details[i].language;
      this.formArray.push(
        this.formBuilder.group({
          userIdFormControl: new FormControl(
            { value: this.detailsToBeStored[i].userId, disabled: true },
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(15),
            ]
          ),
          nameFormControl: new FormControl(
            { value: this.detailsToBeStored[i].name, disabled: true },
            [Validators.required, Validators.pattern('[a-zA-Z]+')]
          ),
          emailFormControl: new FormControl(
            { value: this.detailsToBeStored[i].email, disabled: true },
            [Validators.required, Validators.email]
          ),
          countryFormControl: new FormControl(
            { value: this.detailsToBeStored[i].country, disabled: true },
            Validators.required
          ),
          genderFormControl: [
            { value: this.detailsToBeStored[i].gender, disabled: true },
            [Validators.required],
          ],
          languageFormControl: this.formBuilder.array(
            this.detailsToBeStored[i].language,
            [Validators.required]
          ),
        })
      );
      this.formArray[i].disable();
    }
    this.lengthOfArray = this.detailsToBeStored.length;
    //this.languageArray = this.dataTransfer.languageArray;
    this.languages.forEach((e) => {
      console.log(e);
    });
    console.log(this.lengthOfArray);
  }
  goToPage(pageName: string): void {
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      console.log(this.detailsToBeStored.length);
      if (this.dataTransfer.details[i].isCheck == false) {
        this.dataTransfer.details[i].isCheck = true;
        this.formArray[i].disable();
      }
    }
    this.router.navigate(['/form']);
  }
  editValues(id: number) {
    console.log('clicked', id);
    console.log(this.dataTransfer.details.length);
    this.selectedLanguageArray = [];
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i].isSelected === true) {
        // this.selectedLanguage += this.languages[i].value + ' ';
        this.selectedLanguageArray.push(this.languages[i].value);
      }
    }
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      if (id == i) {
        this.dataTransfer.details[i].isCheck = false;
        console.log(this.formArray[i].value.languageFormControl);
        this.formArray[i].enable();
        //console.log(this.formArray[i].value.userIdFormControl.disabled);
        break;
      }
    }
  }
  checkCancelBUtton(i: number) {
    this.dataTransfer.details[i].isCheck = true;
    this.formArray[i].disable();
    this.formArray.splice(
      i,
      1,
      this.formBuilder.group({
        userIdFormControl: new FormControl(
          { value: this.detailsToBeStored[i].userId, disabled: true },
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ]
        ),
        nameFormControl: new FormControl(
          { value: this.detailsToBeStored[i].name, disabled: true },
          [Validators.required, Validators.pattern('[a-zA-Z]+')]
        ),
        emailFormControl: new FormControl(
          { value: this.detailsToBeStored[i].email, disabled: true },
          [Validators.required, Validators.email]
        ),
        countryFormControl: new FormControl(
          {
            value: this.detailsToBeStored[i].country,
            disabled: true,
          },
          Validators.required
        ),
        genderFormControl: [
          { value: this.detailsToBeStored[i].gender, disabled: true },
          [Validators.required],
        ],
        languageFormControl: this.formBuilder.array(
          this.detailsToBeStored[i].language,
          [Validators.required]
        ),
      })
    );
    this.languages.splice(i, 1, [
      { value: 'English', name: 'Englsih', isSelected: false },
      { value: 'Hindi', name: 'Hindi', isSelected: false },
      { value: 'Telugu', name: 'Telugu', isSelected: false },
    ]);
    this.dataTransfer.details[i].language.forEach((element) => {
      console.log(element);
    });
    for (let value of this.languages[i]) {
      if (this.dataTransfer.details[i].language.indexOf(value.name) > -1) {
        console.log(value.name);
        value.isSelected = true;
      }
    }
    // console.log(checkForm.value.languageFormControl);
    console.log(this.formArray[i].value.languageFormControl);
  }
  cancelValues(id: number) {
    this.selectedLanguageArray = [];
    let checkForm;
    let checkLanguage;
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i].isSelected === true) {
        // this.selectedLanguage += this.languages[i].value + ' ';
        this.selectedLanguageArray.push(this.languages[i].value);
      }
    }
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      if (id == i) {
        checkForm = this.formArray[i];
        checkLanguage = this.formArray[i].value.languageFormControl;
        console.log(checkLanguage);
        // this.checkCancelBUtton(i);
        if (
          checkForm.value.userIdFormControl !=
            this.detailsToBeStored[i].userId ||
          checkForm.value.nameFormControl != this.detailsToBeStored[i].name ||
          checkForm.value.emailFormControl != this.detailsToBeStored[i].email ||
          checkForm.value.countryFormControl !=
            this.detailsToBeStored[i].country ||
          checkForm.value.genderFormControl != this.detailsToBeStored[i].gender
        ) {
          if (confirm('do you want save the changes') == true) {
            this.saveValues(id);
          }
        } else {
          let arr1 = checkForm.value.languageFormControl;
          let arr2 = this.detailsToBeStored[i].language;
          let checkExist;
          for (let lang of arr1) {
            console.log(lang);
          }
          for (let lang2 of arr2) {
            console.log(lang2);
          }
          arr2.forEach((e: string) => {
            if (arr1.indexOf(e) > -1) {
            } else {
              checkExist = false;
            }
          });
          arr1.forEach((e: string) => {
            if (arr2.indexOf(e) > -1) {
            } else {
              checkExist = false;
            }
          });
          if (checkExist == false) {
            if (
              confirm('do you want save the changes along with langugage') ==
              true
            ) {
              this.saveValues(id);
            } else {
              this.checkCancelBUtton(i);
            }
          }
          if (checkExist == undefined) {
            this.checkCancelBUtton(i);
          }
        }
        //  else {
        //     this.checkCancelBUtton(i);
        //   }
        // } else {
        //   console.log('this is else block');
        //   console.log(checkForm.value.languageFormControl);
        //   console.log(this.detailsToBeStored[i].language);
        //   this.checkCancelBUtton(i);
        //   // if (
        //   //   checkForm.value.languageFormControl !==
        //   //   this.detailsToBeStored[i].language
        //   // ) {
        //   console.log('this is for language check');
        //   let arr1 = checkForm.value.languageFormControl;
        //   let arr2 = this.detailsToBeStored[i].language;
        //   let checkExist;
        //   for (let lang of arr1) {
        //     console.log(lang);
        //   }
        //   for (let lang2 of arr2) {
        //     console.log(lang2);
        //   }
        //   arr2.forEach((e: string) => {
        //     if (arr1.indexOf(e) > -1) {
        //     } else {
        //       checkExist = false;
        //     }
        //   });
        //   arr1.forEach((e: string) => {
        //     if (arr2.indexOf(e) > -1) {
        //     } else {
        //       checkExist = false;
        //     }
        //   });
        //   if (checkExist == false) {
        //     if (
        //       confirm('do you want save the changes along with langugage') ==
        //       true
        //     ) {
        //       this.saveValues(id);
        //     } else {
        //       this.checkCancelBUtton(i);
        //     }
        //   }
        //   // } else {
        //   // this.checkCancelBUtton(i);
        //   // }
        // }

        break;
      }
    }
    console.log('cancel');
  }
  saveValues(id: number) {
    console.log('save');
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      if (id == i) {
        console.log('saved', i);
        // console.log(this.dataTransfer.details[i].language);
        this.dataTransfer.details[i].isCheck = true;
        this.formArray[i].disable();
        this.dataTransfer.details[i].userId =
          this.formArray[i].value.userIdFormControl;
        this.dataTransfer.details[i].name =
          this.formArray[i].value.nameFormControl;
        this.dataTransfer.details[i].email =
          this.formArray[i].value.emailFormControl;
        this.dataTransfer.details[i].country =
          this.formArray[i].value.countryFormControl;
        this.dataTransfer.details[i].gender =
          this.formArray[i].value.genderFormControl;

        this.dataTransfer.details[i].language =
          this.formArray[i].value.languageFormControl;
        console.log(
          this.formArray[i].value.languageFormControl,
          typeof this.formArray[i].value.languageFormControl
        );
        break;
      }
    }
  }
  deleteValues(id: number) {
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      if (id == i) {
        console.log('delete', i);
        console.log(this.dataTransfer.details.length);
        console.log(this.formArray.length);
        console.log(this.detailsToBeStored.length);
        this.dataTransfer.details[i].isCheck = false;
        console.log(this.formArray[i].value.languageFormControl);
        this.formArray[i].enable();
        this.dataTransfer.details.splice(i, 1);
        this.detailsToBeStored.splice(i, 1);
        this.formArray.splice(i, 1);
        this.languages.splice(i, 1);
        console.log(this.dataTransfer.details.length);
        console.log(this.formArray.length);
        console.log(this.detailsToBeStored.length);
        this.ngOnInit();
        break;
      }
    }
  }
  checkIndex(arr: Array<string>, value: string, subNum: number, num: number) {
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      if (arr.indexOf(value) > -1) {
        this.languages[num][subNum].isSelected = true;
      }
    }
  }
  onCheckboxChange(e: any, id: number, subNum: number, num: number) {
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      if (id == i) {
        const checkArray: FormArray = this.formArray[i].get(
          'languageFormControl'
        ) as FormArray;
        console.log(checkArray);
        if (e.target.checked) {
          checkArray.push(new FormControl(e.target.value));
          console.log(checkArray.value);
          this.checkIndex(
            checkArray.value,
            new FormControl(e.target.value).value,
            subNum,
            num
          );
          //this.detailsToBeStored[i].language = checkArray.value;
          //this.formArray[i].value.languageFormControl = checkArray.value;
        } else {
          let k: number = 0;
          // console.log(checkArray.value);
          checkArray.controls.forEach((item) => {
            console.log(item.value, e.target.value);
            if (item.value == e.target.value) {
              checkArray.removeAt(k);
              this.checkIndex(checkArray.value, item.value, subNum, num);
              console.log(checkArray.value);
              //this.detailsToBeStored[i].language = checkArray.value;
              // this.formArray[i].value.languageFormControl = checkArray.value;
              return;
            }
            k++;
          });
        }
        console.log(checkArray.value);
        this.formArray[i].value.languageFormControl = checkArray.value;
        console.log(this.formArray[i].value.languageFormControl);
      }
    }
  }
}

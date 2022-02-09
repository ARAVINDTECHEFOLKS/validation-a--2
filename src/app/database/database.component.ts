import { Component, OnInit } from '@angular/core';
import { DataTransfer } from '../services/dataTransfer.service';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
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
    JSON.parse(JSON.stringify(this.dataTransfer.languagesArray)),
  ];
  detailsToBeStored: Array<any> = [undefined];
  //ShowSave: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataTransfer: DataTransfer,
    private router: Router,
    public dialog: MatDialog
  ) {}
  formArray: Array<any> = [undefined];

  ngOnInit(): void {
    for (let i = 1; i < this.dataTransfer.details.length; i++) {
      this.languages.push(
        JSON.parse(JSON.stringify(this.dataTransfer.languagesArray))
      );
      this.detailsToBeStored[i] = this.dataTransfer.details[i];
      this.detailsToBeStored[i].id = i;
      this.formArray.push(
        this.formBuilder.group({
          userIdFormControl: new FormControl(this.detailsToBeStored[i].userId),
          nameFormControl: new FormControl(this.detailsToBeStored[i].name),
          emailFormControl: new FormControl(this.detailsToBeStored[i].email),
          countryFormControl: new FormControl(
            this.detailsToBeStored[i].country
          ),
          genderFormControl: [this.detailsToBeStored[i].gender],
          languageFormControl: this.formBuilder.array(
            this.detailsToBeStored[i].language
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
        userIdFormControl: new FormControl(this.detailsToBeStored[i].userId),
        nameFormControl: new FormControl(this.detailsToBeStored[i].name),
        emailFormControl: new FormControl(this.detailsToBeStored[i].email),
        countryFormControl: new FormControl(this.detailsToBeStored[i].country),
        genderFormControl: [this.detailsToBeStored[i].gender],
        languageFormControl: this.formBuilder.array(
          this.detailsToBeStored[i].language
        ),
      })
    );
    this.languages.splice(
      i,
      1,
      JSON.parse(JSON.stringify(this.dataTransfer.languagesArray))
    );
    this.dataTransfer.details[i].language.forEach((element: any) => {
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
  compareArray(arr1: Array<string>, arr2: Array<string>) {
    let checkValue = true;
    arr1.forEach((e: string) => {
      if (arr2.indexOf(e) > -1) {
      } else {
        checkValue = false;
      }
    });
    return checkValue;
  }
  dialogBoxResult(id: number) {
    let dialogBox = this.dialog.open(DialogComponent);
    let checkSubmisson;
    dialogBox.afterClosed().subscribe((result) => {
      console.log(result);
      checkSubmisson = result;
      if (checkSubmisson) {
        console.log(checkSubmisson);
        this.saveValues(id);
      } else {
        console.log(checkSubmisson);
        this.checkCancelBUtton(id);
      }
    });
    console.log(checkSubmisson);
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
          this.dialogBoxResult(i);
        } else {
          let arr1 = checkForm.value.languageFormControl;
          let arr2 = this.detailsToBeStored[i].language;
          let checkExist1;
          let checkExist2;
          checkExist1 = this.compareArray(arr2, arr1);
          checkExist2 = this.compareArray(arr1, arr2);
          if (checkExist1 == false || checkExist2 == false) {
            this.dialogBoxResult(i);
          }
          if (checkExist1 == true && checkExist2 == true) {
            this.checkCancelBUtton(i);
          }
        }
        break;
      }
    }
  }
  saveValues(id: number) {
    console.log('save');
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      if (id == i) {
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
        break;
      }
    }
  }
  deleteValues(id: number) {
    for (let i = 1; i < this.detailsToBeStored.length; i++) {
      if (id == i) {
        this.dataTransfer.details[i].isCheck = false;
        this.formArray[i].enable();
        this.dataTransfer.details.splice(i, 1);
        this.detailsToBeStored.splice(i, 1);
        this.formArray.splice(i, 1);
        this.languages.splice(i, 1);
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
        if (e.target.checked) {
          checkArray.push(new FormControl(e.target.value));
          this.checkIndex(
            checkArray.value,
            new FormControl(e.target.value).value,
            subNum,
            num
          );
        } else {
          let k: number = 0;
          // console.log(checkArray.value);
          checkArray.controls.forEach((item) => {
            if (item.value == e.target.value) {
              checkArray.removeAt(k);
              this.checkIndex(checkArray.value, item.value, subNum, num);
              return;
            }
            k++;
          });
        }
        this.formArray[i].value.languageFormControl = checkArray.value;
      }
    }
  }
}

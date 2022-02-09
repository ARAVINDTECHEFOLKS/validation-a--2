export class DataTransfer {
  //count:number=0
  languagesArray = [
    { value: 'English', name: 'Englsih', isSelected: false },
    { value: 'Hindi', name: 'Hindi', isSelected: false },
    { value: 'Telugu', name: 'Telugu', isSelected: false },
  ];
  details: Array<any> = [undefined];
  lengthofArray: number = this.details.length;
  languageArray: Array<string> = [];
  updateDetails(userDetails: any) {
    //this.count++;
    this.details.push(userDetails);
    this.lengthofArray = this.details.length;
    this.details[this.lengthofArray - 1].id = this.details.length - 1;
  }
}

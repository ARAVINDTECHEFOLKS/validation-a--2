export class DataTransfer {
  //count:number=0
  details: [
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

  lengthofArray: number = this.details.length;
  languageArray: Array<string> = [];
  updateDetails(userDetails: any) {
    //this.count++;
    this.details.push(userDetails);
    this.details[this.lengthofArray - 1].id = this.details.length - 1;
    this.lengthofArray = this.details.length;
  }
}

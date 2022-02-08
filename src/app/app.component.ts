import { Component } from '@angular/core';
import { DataTransfer } from '../app/services/dataTransfer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataTransfer],
})
export class AppComponent {
  title = 'form';
  constructor(private datatransfer: DataTransfer) {}
}

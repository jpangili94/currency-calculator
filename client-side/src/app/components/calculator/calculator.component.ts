import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
	toCurrency: String;
	fromCurrency: String;
	amount: Number;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService
   ) {}

  ngOnInit() {}

  onCalculatorConvert(){
    const currencyObj = {
      toCurrency: this.toCurrency,
      fromCurrency: this.fromCurrency,
      amount: this.amount
    }

    // Required Numeric Amount
    if(!this.validateService.validateAmount(currencyObj.amount)){
      this.flashMessage.show("Please provide a numeric amount.", {cssClass: 'alert-warning', timeout: 5000});
      return false;
    }
  }
}

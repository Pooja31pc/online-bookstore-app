import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from "src/app/services/checkout.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  checkoutFormGroup: FormGroup;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];


  constructor(private formBuilder: FormBuilder,
              private _cartService: CartService,
              private _checkoutService: CheckoutService) { }

  ngOnInit() {
    this.cartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        cvv: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    })

    const startMonth: number = new Date().getMonth() + 1;
    
    console.log("startMonth: " + startMonth);

    this._checkoutService.getCreditCardMonths(startMonth).subscribe(
      data => {
        
        this.creditCardMonths = data;
      }
    );

    // populate credit card years

    this._checkoutService.getCreditCardYears().subscribe(
      data => {
        
        this.creditCardYears = data;
      }
    );

    
  
  }

  cartDetails(){
    this.cartItems = this._cartService.cartItems;

    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this._cartService.calculateTotalPrice();
  }

  onSubmit() {
    console.log('Purchase the books');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("Emial is", this.checkoutFormGroup.get('customer').value.email);
  }


  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this._checkoutService.getCreditCardMonths(startMonth).subscribe(
      data => {
        
        this.creditCardMonths = data;
      }
    );
  }


}





// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

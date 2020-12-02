import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-ordered-details',
  templateUrl: './ordered-details.component.html',
  styleUrls: ['./ordered-details.component.css']
})
export class OrderedDetailsComponent implements OnInit {

  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
    localStorage.removeItem("cartDetails");
    this._cartService.emptyCart();
    
  }

}

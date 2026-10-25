import { Component, inject, input } from '@angular/core';
import { Product } from '../models/common.model';
import { LoaderService } from '../services/LoaderService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  products = input<Product[]>()
private loader = inject(LoaderService);

ngOnInit(){
  // this.loader.show();

  // setTimeout(() => {
  //     this.loader.hide();

  // }, 3000);
}
}

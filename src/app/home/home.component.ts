import { Component, inject, input } from '@angular/core';
import { Product } from '../models/common.model';
import { LoaderService } from '../services/LoaderService';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../utils/emailValidator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  products = input<Product[]>()
private loader = inject(LoaderService);

 formGroup!:FormGroup

 fb = inject(FormBuilder)

ngOnInit(){

  this.formGroup = this.fb.group({
    name:['',Validators.required],
    age:['',[Validators.required,emailValidator]]
  })
  // this.loader.show();

  // setTimeout(() => {
  //     this.loader.hide();

  // }, 3000);
}


onSubmit(){

  let k = {'das':3}
  let b = {'ddythas':3}
  const c = {k,b}
 console.log(c)
  console.log(this.formGroup)
}
}

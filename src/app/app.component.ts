import { Component, computed, effect, EffectRef, inject, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './models/common.model';
import { AppService } from './services/app.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './home/home.component';
import { LoaderService } from './services/LoaderService';
import { interval } from 'rxjs'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,MatProgressSpinnerModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loader = inject(LoaderService);
  title = 'signalLearningApp';
  count = signal({
    value: 10
  })

  intreavel = interval(1000)
  effectRef!: EffectRef;
  values = signal<number[]>([])
  inputValueFromParent = input<number>();
  products = signal<Product[]>([])
  appService = inject(AppService)
  inp = signal<number>(2)

  below20Values = computed(()=>{
    const responseValue = this.products()

    return responseValue.length ?  responseValue?.filter(data=>data?.id <=20) :[]
  })

  greaterThan20 = computed(()=>{
    const responseValue = this.products() ?? []

    return responseValue.length ? responseValue?.filter(data=>data?.id  > 20) : []
  })

  tenXcounter = computed(() => {

    console.log('com')
    const value = this.inp()

    return value * 10

  })

  constructor() {

    this.effectRef = effect(() => {

      console.log(`Value of count is ${this.count().value}`)

   

        
          console.log("Lesser" ,this.greaterThan20())

          console.log("Lesser" ,this.below20Values())
    })

  }


  ngOnInit() {
   this.loadProducts();
  }

  async loadProducts() {
    try {
      this.loader.show();
      const response = await this.appService.loadProductsDataWithHttp()
      console.log(response)
      this.products.set(response.products)
      setTimeout(()=>{
         this.loader.hide();
      },1500)
     // this.loader.hide();
    } catch (e) {
          this.loader.hide();
      console.log(e)
    }


  }

  increment() {

    this.inp.update(values =>
      values = ++values
    )

    this.count.update(data => ({
      ...data,
      value: ++data.value
    }))

  }

  append() {

    this.values.update(value => ([
      ...value,
      value[value.length - 1] + 1
    ]))

  }

  ngOndestroy() {

    this.effectRef?.destroy()

  }

}

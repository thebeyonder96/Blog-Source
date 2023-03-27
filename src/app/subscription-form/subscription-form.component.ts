import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubService } from '../service/sub.service';


@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent {
  emailError:boolean=false;
  isSubscribed:boolean=false;

  constructor(private subService:SubService){}
  onSubmit(form:any){
    // console.log(form);

    const subData:Sub={
      email: form.value.Email,
      name: form.value.Name
    }
    // this.subService.addSub(subData);
    this.subService.checkSubs(subData.email).subscribe(val=>{
      if (val.empty) {
        this.subService.addSub(subData);
        this.isSubscribed=true
      } else {
        this.emailError= true;
      }

    })

  }
}

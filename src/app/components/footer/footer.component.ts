import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscriptions } from 'src/app/interfaces/subscriptions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  newSubscriptionsForm: FormGroup;
  isSubmit = false;
  subscription: Subscriptions;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.createNewSubscriptionsForm();
  }

  get emailControl(): any {
    return this.newSubscriptionsForm.get('email') as FormControl;
  }

  onSubmit(): void {
    if (this.newSubscriptionsForm.invalid) {
      return;
    }

    this.isSubmit = true;
    this.save(this.newSubscriptionsForm.value);
  }

  private createNewSubscriptionsForm(): void {
    this.newSubscriptionsForm = this.fb.group({
      email: [
        this.subscription?.email || null,
        [
          Validators.required]
      ]
    });

    setTimeout(() => {
      this.isSubmit = false;
    }, 3000);

  }

  public save(newSubscription: Subscriptions): void {

    this.http.post('http://plushtoys-lb.com/megavendingapi/api.php/subscriptions', newSubscription).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    this.createNewSubscriptionsForm();
  }

}

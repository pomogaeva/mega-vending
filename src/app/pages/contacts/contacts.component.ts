import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Request } from 'src/app/interfaces/request';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  newRequestForm: FormGroup;
  isSubmit = false;
  request: Request;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.createNewRequestForm();
  }

  get fullNameControl(): any {
    return this.newRequestForm.get('fullName') as FormControl;
  }

  get emailControl(): any {
    return this.newRequestForm.get('email') as FormControl;
  }

  get subjectControl(): any {
    return this.newRequestForm.get('subject') as FormControl;
  }

  get phoneControl(): any {
    return this.newRequestForm.get('phone') as FormControl;
  }

  get messageControl(): any {
    return this.newRequestForm.get('message') as FormControl;
  }

  onSubmit(): void {
    this.isSubmit = true;

    if (this.newRequestForm.invalid) {
      return;
    }

    this.isSubmit = false;
    this.save(this.newRequestForm.value);
  }

  private createNewRequestForm(): void {
    this.newRequestForm = this.fb.group({
      fullName: [
        this.request?.fullName || null,
        [
          Validators.required]
      ],
      email: [
        this.request?.email || null,
        [
          Validators.required]
      ],
      phone: [this.request?.phone || null],
      subject: [
        this.request?.subject || null,
        [
          Validators.required]
      ],
      message: [this.request?.message || null],
    });

  }

  public save(newRequest: Request): void {

    this.http.post('http://localhost:3000/requests', newRequest).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    this.createNewRequestForm();
  }

}

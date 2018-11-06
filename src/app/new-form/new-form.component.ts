import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss'],
})
export class NewFormComponent {
  personForm = this.fb.group({

    name: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.email, Validators.required],
    phone: [null, Validators.required],
    nick: [null],
    avatar: [null]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.personForm.value);
  }
}

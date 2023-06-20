import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Superhero } from 'src/app/core/models/superhero.model';

@Component({
  selector: 'app-superhero-form',
  templateUrl: './superhero-form.component.html',
  styleUrls: ['./superhero-form.component.scss'],
})
export class SuperheroFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SuperheroFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { superhero: Superhero }
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this?.data) this.setForm(this.data.superhero);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
    });
  }

  setForm(superhero: Superhero): void {
    this.form.patchValue({
      id: superhero.id,
      name: superhero.name,
    });
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }
}

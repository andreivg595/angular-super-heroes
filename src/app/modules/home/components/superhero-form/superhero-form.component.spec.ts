import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SuperheroFormComponent } from './superhero-form.component';
import { Superhero } from 'src/app/core/models/superhero.model';

class Stub {
  close(): void {}
}

describe('SuperheroFormComponent', () => {
  let component: SuperheroFormComponent;
  let fixture: ComponentFixture<SuperheroFormComponent>;
  let dialogRef: MatDialogRef<SuperheroFormComponent>;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SuperheroFormComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useClass: Stub },
        { provide: MAT_DIALOG_DATA, useValue: { superhero: {} as Superhero } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(SuperheroFormComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    form = TestBed.inject(FormBuilder).group({
      valid: true,
    });
    component.form = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['id']).toBeDefined();
    expect(component.form.controls['name']).toBeDefined();
    expect(component.form.controls['name'].validator).toBeTruthy();
  });

  it('should set the form values when data is provided', () => {
    const superhero: Superhero = { id: 1, name: 'Superman' };
    component.data = { superhero };
    component.ngOnInit();
    expect(component.form.value).toEqual({ id: 1, name: 'Superman' });
  });

  it('should form valid when there is a name', () => {
    component.form.controls['name'].setValue('test');
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
  });

  it('should form invalid when name is null', () => {
    component.form.controls['name'].setValue(null);
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
  });

  it('should disable the button when the form is invalid', () => {
    form.controls['valid'].setValue(false);
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(By.css('#submit-btn'));
    expect(submitBtn.nativeElement.disabled).toBe(true);
  });

  it('should close dialogRef', () => {
    const dialogSpy = spyOn(component.dialogRef, 'close');
    component.close();
    expect(dialogSpy).toHaveBeenCalled();
  });
});

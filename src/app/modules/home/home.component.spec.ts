import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home.component';
import { Superhero } from 'src/app/core/models/superhero.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, MatDialogModule],
      declarations: [HomeComponent],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all superheroes on initialization', () => {
    const superheroes: Superhero[] = [
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Superwoman' },
    ];
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.superheroes).toEqual(superheroes);
  });
});

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuperheroService } from 'src/app/core/api/superhero.service';
import { Superhero } from 'src/app/core/models/superhero.model';
import { SuperheroFormComponent } from './components/superhero-form/superhero-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  superheroes: Superhero[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private superheroService: SuperheroService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.superheroService.getAllSuperheroes().subscribe((s) => {
      this.superheroes = [...s];
    });
  }

  addHero(): void {
    this.openDialog();
  }

  editHero(superhero: Superhero): void {
    this.openDialog(superhero);
  }

  deleteHero(superhero: Superhero): void {
    if (confirm('Are you sure you want to delete this superhero?')) {
      this.superheroService.deleteSuperhero(superhero.id);
    }
  }

  openDialog(superhero?: Superhero): void {
    const dialogRef = this.dialog.open(SuperheroFormComponent, {
      width: '400px',
      data: superhero ? { superhero } : undefined,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data?.id) {
        this.superheroService.updateSuperhero(data);
      } else {
        this.superheroService.addSuperhero(data);
      }
    });
  }
}

import { Component } from '@angular/core';
import { SuperheroService } from 'src/app/core/api/superhero.service';
import { Superhero } from 'src/app/core/models/superhero.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  superheroes: Superhero[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private superheroService: SuperheroService) {
    this.superheroService.getAllSuperheroes().subscribe((s) => {
      this.superheroes = s;
    });
  }

  addHero(): void {}

  editHero(hero: Superhero): void {}

  deleteHero(hero: Superhero): void {}
}

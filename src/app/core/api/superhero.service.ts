import { Injectable } from '@angular/core';
import { Superhero } from '../models/superhero.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private superheroes: Superhero[] = [];

  private superheroesSubject: BehaviorSubject<Superhero[]> =
    new BehaviorSubject<Superhero[]>([]);

  public superheroes$: Observable<Superhero[]> =
    this.superheroesSubject.asObservable();

  constructor() {
    this.superheroes = [
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Superwoman' },
    ];
    this.superheroesSubject.next(this.superheroes);
  }

  addSuperhero(superhero: Superhero): void {
    superhero.id = Math.random() * 1000000;
    this.superheroes.push(superhero);
    this.superheroesSubject.next(this.superheroes);
  }

  getAllSuperheroes(): Observable<Superhero[]> {
    return this.superheroes$;
  }
}

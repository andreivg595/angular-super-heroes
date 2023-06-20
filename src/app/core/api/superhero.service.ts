import { Injectable } from '@angular/core';
import { Superhero } from '../models/superhero.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

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

  getSuperheroById(id: number): Observable<Superhero | undefined> {
    return this.superheroes$.pipe(
      map((superheroes) => superheroes.find((hero) => hero.id === id))
    );
  }

  updateSuperhero(superhero: Superhero): void {
    const index = this.superheroes.findIndex((s) => s.id === superhero.id);
    if (index !== -1) {
      this.superheroes[index] = superhero;
      this.superheroesSubject.next(this.superheroes);
    }
  }

  deleteSuperhero(id: number): void {
    const index = this.superheroes.findIndex((hero) => hero.id === id);
    if (index !== -1) {
      this.superheroes.splice(index, 1);
      this.superheroesSubject.next(this.superheroes);
    }
  }
}

import { TestBed } from '@angular/core/testing';
import { SuperheroService } from './superhero.service';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperheroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all superheroes', (done: DoneFn) => {
    service.getAllSuperheroes().subscribe((superheroes) => {
      expect(superheroes).toBeDefined();
      expect(superheroes.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return a superhero by id', (done: DoneFn) => {
    const superheroId = 1;
    service.getSuperheroById(superheroId).subscribe((superhero) => {
      expect(superhero).toBeDefined();
      expect(superhero?.id).toBe(superheroId);
      done();
    });
  });

  it('should add a new superhero', (done: DoneFn) => {
    const newSuperhero = { id: 3, name: 'Spiderman' };
    service.addSuperhero(newSuperhero);
    service.getAllSuperheroes().subscribe((superheroes) => {
      expect(superheroes).toContain(newSuperhero);
      done();
    });
  });

  it('should update an existing superhero', (done: DoneFn) => {
    const superheroId = 1;
    const updatedSuperhero = { id: 1, name: 'Updated Superman' };
    service.updateSuperhero(updatedSuperhero);
    service.getSuperheroById(superheroId).subscribe((superhero) => {
      expect(superhero).toEqual(updatedSuperhero);
      done();
    });
  });

  it('should delete a superhero', (done: DoneFn) => {
    const superheroId = 2;
    service.deleteSuperhero(superheroId);
    service.getSuperheroById(superheroId).subscribe((superhero) => {
      expect(superhero).toBeUndefined();
      done();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HeroesDataService } from './heroes-data.service';

describe('HeroesDataService', () => {
  let heroesDataService: HeroesDataService;
  let heroesList: { name: string; id: string }[];
  let initialLengthOfList: number;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HeroesDataService] });
    heroesDataService = TestBed.inject(HeroesDataService);
    heroesDataService.heroesList = [{ name: 'test', id: '100' }];
    heroesList = heroesDataService.getHeroesList();
    initialLengthOfList = heroesList.length;
  });

  it('it should be created', () => {
    expect(heroesDataService).toBeTruthy();
  });

  it('it should return the list of heroes', () => {
    expect(heroesDataService.getHeroesList()).toEqual(
      heroesDataService.heroesList
    );
  });

  it('it should add a hero to the list', () => {
    const heroToAdd = { name: 'hero 9', id: '9' };
    heroesDataService.addHero(heroToAdd);
    heroesList = heroesDataService.getHeroesList();
    expect(heroesList.length).toEqual(initialLengthOfList + 1);
    expect(heroesList.indexOf(heroToAdd)).not.toEqual(-1);
  });

  it('it should delete a hero from the list', () => {
    const heroToDelete = heroesList[0];
    heroesDataService.deleteHero(heroToDelete.id);
    heroesList = heroesDataService.getHeroesList();
    expect(heroesList.indexOf(heroToDelete)).toEqual(-1);
    expect(heroesList.length).toEqual(initialLengthOfList - 1);
  });

  it('it should edit a hero', () => {
    const heroToEdit = heroesList[0];
    heroesDataService.editHero({
      name: 'editedName',
      id: heroToEdit.id,
    });
    heroesList = heroesDataService.getHeroesList();
    expect(heroesList[0].name).toEqual('editedName');
    expect(heroesList.length).toEqual(initialLengthOfList);
  });
});

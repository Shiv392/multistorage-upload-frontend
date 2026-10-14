import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbStorage } from './db-storage';

describe('DbStorage', () => {
  let component: DbStorage;
  let fixture: ComponentFixture<DbStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbStorage],
    }).compileComponents();

    fixture = TestBed.createComponent(DbStorage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

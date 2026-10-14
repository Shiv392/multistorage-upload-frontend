import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiskStorage } from './disk-storage';

describe('DiskStorage', () => {
  let component: DiskStorage;
  let fixture: ComponentFixture<DiskStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiskStorage],
    }).compileComponents();

    fixture = TestBed.createComponent(DiskStorage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

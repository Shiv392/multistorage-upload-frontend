import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketStorage } from './bucket-storage';

describe('BucketStorage', () => {
  let component: BucketStorage;
  let fixture: ComponentFixture<BucketStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BucketStorage],
    }).compileComponents();

    fixture = TestBed.createComponent(BucketStorage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

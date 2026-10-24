import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketClient } from './bucket-client';

describe('BucketClient', () => {
  let component: BucketClient;
  let fixture: ComponentFixture<BucketClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BucketClient],
    }).compileComponents();

    fixture = TestBed.createComponent(BucketClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

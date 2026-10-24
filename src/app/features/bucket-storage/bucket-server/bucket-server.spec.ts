import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketServer } from './bucket-server';

describe('BucketServer', () => {
  let component: BucketServer;
  let fixture: ComponentFixture<BucketServer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BucketServer],
    }).compileComponents();

    fixture = TestBed.createComponent(BucketServer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

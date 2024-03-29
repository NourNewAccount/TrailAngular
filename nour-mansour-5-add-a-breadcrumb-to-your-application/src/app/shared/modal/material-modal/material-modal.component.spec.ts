import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModalComponent } from './material-modal.component';

describe('MaterialModalComponent', () => {
  let component: MaterialModalComponent;
  let fixture: ComponentFixture<MaterialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

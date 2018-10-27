import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, StoreModule.forRoot({})],
      declarations: [LogInComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

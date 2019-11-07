import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProjectComponent } from './project-project.component';

describe('ProjectProjectComponent', () => {
  let component: ProjectProjectComponent;
  let fixture: ComponentFixture<ProjectProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

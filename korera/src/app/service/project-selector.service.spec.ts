import { TestBed } from '@angular/core/testing';

import { ProjectSelectorService } from './project-selector.service';

describe('ProjectSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectSelectorService = TestBed.get(ProjectSelectorService);
    expect(service).toBeTruthy();
  });
});

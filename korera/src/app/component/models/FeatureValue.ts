import { Project } from './../../project';

import { Feature } from './Feature';
import { Resource } from './../../resource';

export class FeatureValue {
  id?: number;
  value: string;
  projectId?: string;
  resourceId?: string;
  featureId?: string;
  project?: Project;
  feature?: Feature;
  resource?: Resource;
  submit?: string;
}
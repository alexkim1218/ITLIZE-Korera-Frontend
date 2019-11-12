import { FeatureValue } from './FeatureValue';
import { Project } from './../../project';

export class Feature {
  name: string;
  type: string;
  content?: string;
  id?: number;
  projectId?: string;
  project?: Project;
  featureValue?: FeatureValue;
  submit?: string;
}
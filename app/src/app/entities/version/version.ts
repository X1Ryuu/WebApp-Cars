import {Model} from '../model/model';
import {Generation} from '../generation/generation';
import {Engine} from '../engine/engine';

export interface Version {
  id: number;
  name: string;
  nameId: string;

  startYear: number;
  endYear: number;

  model: Model;
  generation: Generation;

  engines: Engine[];
}

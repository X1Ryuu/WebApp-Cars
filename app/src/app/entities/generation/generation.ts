import {Model} from '../model/model';
import {Version} from '../version/version';

export interface Generation {
  id: number;
  nameId: string;
  name: string;
  startYear: number;
  endYear: number;
  model: Model;
  versions: Version[];
}

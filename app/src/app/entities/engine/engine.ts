import {Version} from '../version/version';
import {Model} from "../model/model";
import {Generation} from "../generation/generation";

export interface Engine {
  id: number;
  name: string;
  version: Version;
  model: Model;
  generation: Generation;
  gasoline: string;
  volume: number;
  hp: number;
  hybridHp: number;
  injection: string;
  fromDate: string;
}

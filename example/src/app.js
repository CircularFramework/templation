import { Templation } from '../../lib';
import { data, user } from './data';

/** initialize Templation */
let templation = new Templation();

let component1 = templation.compile('app-1', 'template-1', data);
component1.render();

let component2 = templation.compile('app-2', 'template-2', user);
component2.render();
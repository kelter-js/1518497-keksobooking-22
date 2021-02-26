/* eslint-disable */
import {generatePromo, generateBunchPromos} from './data.js';
import * as service from './service.js';
import './validator.js';
import './checker.js';
import {insertPromo} from './insert-promo.js';

const generatedPromos = generateBunchPromos();

insertPromo(generatedPromos[0]);

/* eslint-enable */

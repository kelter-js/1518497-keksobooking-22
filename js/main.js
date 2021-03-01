/* eslint-disable */
import {generatePromo, generateBunchPromos} from './data.js';
import * as service from './service.js';
import * as validator from './validator.js';
import './checker.js';
import {insertPromo} from './insert-promo.js';

const generatedPromos = generateBunchPromos();

insertPromo(generatedPromos[0]);

/* eslint-enable */

/* eslint-disable */
import {generatePromo, generateBunchPromos} from './data.js';
import * as service from './service.js';
import * as validator from './validator.js';
import './checker.js';
import {insertPromo} from './insert-promo.js';
import {pageEnabler} from './page-enabler.js';
import {pageDisabler} from './page-disabler.js';

pageDisabler();
const generatedPromos = generateBunchPromos();

/* eslint-enable */

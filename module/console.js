/**
 * console.js
 */

const fs = require('fs');
const {Console, log} = require('console');

const output = fs.createWriteStream('./stdout.log'); // ./ : 같은 경로 but 경로임을 알려주는 표시?
const errorOutput = fs.createWriteStream('./stderr.log');

// logger: 로그 남기는 주체/객체
const logger = new Console({stdout : output, stderr : errorOutput});

const msg = 'Log Writing';

logger.log('Result : %s', msg);     // stdout
logger.error(`Result : ${msg}`);    // stderr
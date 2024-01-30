// Console 클래스 : 로그파일 만들어서 기록

// 모듈 불러오기
const fs = require('fs');                       // fs 모듈: 파일 시스템 내장 모듈(파일 읽기 쓰기 등)
const {Console, log} = require('console');      // console 모듈 사용

// 파일 쓰기 스트림 생성 -> 파일 생성
const output = fs.createWriteStream('./stdout.log'); // ./ : 같은 경로 but 경로임을 알려주는 표시
const errorOutput = fs.createWriteStream('./stderr.log');

// logger: 로그 남기는 주체/객체
const logger = new Console({stdout : output, stderr : errorOutput});

const msg = 'Log Writing';

logger.log('Result : %s', msg);     // stdout.log 파일에 msg 기록
logger.error(`Result : ${msg}`);    // stderr.log 파일에 msg 기록
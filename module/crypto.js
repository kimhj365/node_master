const crypto = require('crypto');   // crypto 모듈 호출
const data = 'pw1234';

let encData = crypto.createHash('sha512')     // hash 알고리즘 생성
                    .update(data)             // 데이터 암호화
                    .digest('base64');        // 암호화 결과 표시 형식(64자리)
console.log(data, encData);

encData = crypto.createHash('sha512')     // hash 알고리즘 생성
                .update(data)             // 데이터 암호화
                .digest('hex');           // 암호화 결과 표시 형식(hex)
console.log(data, encData);

// salting 암호화
const createSalt = () => {
    return new Promise((resolve, reject) => {
        // 랜덤값 생성 -> buffer
        // 암호화하는 사람도 salting 값 모름
        crypto.randomBytes(64, (err, buf) => {
            if(err) reject(err);
            resolve(buf.toString('base64'))
        })
    })
}

const createCryptoPassword = 
    async(plainPassword)=>{
        // 암호화 하기전에 salt 발생해야함 => await로 동기 처리
        const salt = await createSalt();

        return new Promise((resolve, reject) => {
            crypto.pbkdf2(plainPassword,
                          salt,
                          9999,
                          64,
                          'sha512',
                          (err, key)=>{
                            if(err) reject(err);
                            resolve({password: key.toString('base64'),
                                    salt})
                          })
        })
    }

const cryptoPassword = async() => {
    encData = await createCryptoPassword(data);
    console.log(encData);
}
cryptoPassword();

createCryptoPassword(data)
.then(result => console.log(result))
.catch(err => console.log(err));
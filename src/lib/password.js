/**
 * Edge Runtime에서 사용할 수 있는 Web Crypto API 기반 비밀번호 해싱
 */

/**
 * 비밀번호를 해싱합니다.
 * @param {string} password - 해싱할 비밀번호
 * @returns {Promise<string>} 해싱된 비밀번호 (salt + hash)
 */
export async function hashPassword(password) {
  // 랜덤 salt 생성 (16바이트)
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  // 비밀번호와 salt를 결합하여 해싱
  const passwordBuffer = new TextEncoder().encode(password);
  const saltedPassword = new Uint8Array(salt.length + passwordBuffer.length);
  saltedPassword.set(salt);
  saltedPassword.set(passwordBuffer, salt.length);
  
  // PBKDF2로 해싱 (100,000 iterations)
  const key = await crypto.subtle.importKey(
    'raw',
    saltedPassword,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const hash = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    key,
    256
  );
  
  // salt와 hash를 base64로 인코딩하여 결합
  const saltBase64 = btoa(String.fromCharCode(...salt));
  const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
  
  return `${saltBase64}:${hashBase64}`;
}

/**
 * 비밀번호를 검증합니다.
 * @param {string} password - 검증할 비밀번호
 * @param {string} hashedPassword - 해싱된 비밀번호 (salt:hash 형태)
 * @returns {Promise<boolean>} 검증 결과
 */
export async function verifyPassword(password, hashedPassword) {
  try {
    const [saltBase64, hashBase64] = hashedPassword.split(':');
    
    // base64 디코딩
    const salt = new Uint8Array(atob(saltBase64).split('').map(c => c.charCodeAt(0)));
    const expectedHash = new Uint8Array(atob(hashBase64).split('').map(c => c.charCodeAt(0)));
    
    // 비밀번호와 salt를 결합하여 해싱
    const passwordBuffer = new TextEncoder().encode(password);
    const saltedPassword = new Uint8Array(salt.length + passwordBuffer.length);
    saltedPassword.set(salt);
    saltedPassword.set(passwordBuffer, salt.length);
    
    // 동일한 방식으로 해싱
    const key = await crypto.subtle.importKey(
      'raw',
      saltedPassword,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    const hash = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      key,
      256
    );
    
    const computedHash = new Uint8Array(hash);
    
    // 해시 비교
    if (computedHash.length !== expectedHash.length) {
      return false;
    }
    
    for (let i = 0; i < computedHash.length; i++) {
      if (computedHash[i] !== expectedHash[i]) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

/**
 * 기존 평문 비밀번호와 해싱된 비밀번호를 비교합니다.
 * 마이그레이션 시 기존 NOPASSWORD 등의 특수 케이스를 처리합니다.
 * @param {string} password - 입력된 비밀번호
 * @param {string} storedPassword - 저장된 비밀번호 (평문 또는 해싱)
 * @returns {Promise<boolean>} 검증 결과
 */
export async function comparePassword(password, storedPassword) {
  // 기존 특수 케이스 처리
  if (storedPassword === 'NOPASSWORD') {
    return password === 'NOPASSWORD' || password === '';
  }
  
  // 새로운 해싱 방식인지 확인 (salt:hash 형태)
  if (storedPassword.includes(':') && storedPassword.split(':').length === 2) {
    try {
      return await verifyPassword(password, storedPassword);
    } catch (error) {
      console.error('New hash verification failed:', error);
      return false;
    }
  }
  
  // bcrypt 해시인지 확인
  if (storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$')) {
    // bcrypt는 Edge Runtime에서 사용할 수 없으므로 평문으로 비교
    console.warn('bcrypt hash detected, falling back to plaintext comparison');
    return password === storedPassword;
  }
  
  // 평문 비밀번호 (기존 데이터)
  return password === storedPassword;
}
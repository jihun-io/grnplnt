/**
 * Cloudflare Turnstile CAPTCHA 검증
 * @param {string} token - 클라이언트에서 받은 Turnstile 토큰
 * @param {string} remoteip - 클라이언트 IP 주소 (선택사항)
 * @returns {Promise<{success: boolean, errorCodes?: string[]}>} 검증 결과
 */
export async function verifyTurnstile(token, remoteip = null) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('TURNSTILE_SECRET_KEY not configured');
  }

  if (!token) {
    return {
      success: false,
      errorCodes: ['missing-input-response']
    };
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    
    if (remoteip) {
      formData.append('remoteip', remoteip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    return {
      success: result.success,
      errorCodes: result['error-codes'] || []
    };
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return {
      success: false,
      errorCodes: ['internal-error']
    };
  }
}

/**
 * 클라이언트 IP 주소를 추출합니다.
 * @param {Request} request - Next.js Request 객체
 * @returns {string|null} 클라이언트 IP 주소
 */
export function getClientIP(request) {
  // Cloudflare의 경우
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // 일반적인 프록시 헤더들
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }

  const xRealIP = request.headers.get('x-real-ip');
  if (xRealIP) {
    return xRealIP;
  }

  // 직접 연결인 경우 (개발 환경)
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('remote-addr') || 
         null;
}
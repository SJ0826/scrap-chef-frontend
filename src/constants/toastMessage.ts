export const TOAST_MESSAGE = {
  //POST 매서드
  AUTH_ERROR: '본인인증 실패했습니다. 잠시 후 다시 시도해주세요',
  AUTH_LOCK: '관리자에 의해 잠금된 계정입니다. 고객센터로 문의주세요.',
  AUTH_WITHDRAW: '회원탈퇴한 계정입니다.',
  PASSWORD_CONFIRM_FAIL:
    '비밀번호와 비밀번호 확인란에 동일한 값을 입력해주세요',

  SIGNUP_SUCCESS: '회원가입이 완료되었습니다',
  COPY_SUCCESS: '복사가 완료되었습니다',

  WITHDRAWAL_SUCCESS: '회원탈퇴가 완료되었습니다.',
  LOGIN_FAIL: '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',

  // GET 매서드
  CANNOT_GET_DATA: '데이터를 가져오지 못했습니다.',

  // 401 ~ 서버에러
  EXPIRE_ERROR: '접근권한이 만료되었습니다. 다시 로그인 해주세요',
  ACCESS_ERROR: '허용되지 않는 접근입니다. 관리자에게 문의해주세요.',
  COMMEN_ERROR: '에러가 발생했습니다. 잠수 후 다시 시도해주세요',

  // 500 ~  서버에러
  SERVER_ERROR: '오류가 발생했습니다. \n 잠시 후에 다시 시도해보세요.',
  NETWORK_ERROR: '네트워크 에러가 발생했습니다. 관리자에게 문의해주세요.',
  TIME_ERROR: '요청이 제한 시간을 초과했습니다. 관리자에게 문의해주세요.',
};

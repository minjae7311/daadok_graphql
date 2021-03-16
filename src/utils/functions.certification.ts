import request from "request";
import { RequestCertification, ConfirmCertification } from "../types/graph";
import dotenv from "dotenv";
dotenv.config();

const sendRequest = async (option: any) => {
  return new Promise((resolve, reject) => {
    request.post(option, (_err, res) => {
      resolve(JSON.parse(res.body));
    });
  });
};

const getAuthToken = async () => {
  const authResponse: any = await sendRequest({
    uri:
      "https://api.iamport.kr/users/getToken?_token=8f29ae26b6a85b0a1954e8689f348e06bbc07c34",
    method: "POST",
    form: {
      imp_key: process.env.IAMPORT_KEY,
      imp_secret: process.env.IAMPORT_SECRET,
    },
  });
  return authResponse.response.access_token;
};

/**
 * IamPort에 휴대폰 인증을 요청합니다.
 */
export const requestCertification = async (
  name: string,
  phone: string,
  birth: string,
  gender_digit: string,
  carrier: string,
  is_mvno: boolean
): Promise<RequestCertification> => {
  const Authorization = await getAuthToken();

  const options = {
    uri: `https://api.iamport.kr/certifications/otp/request`,
    method: "POST",
    form: {
      name,
      phone,
      birth,
      gender_digit,
      carrier,
      is_mvno,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };

  const response: any = await sendRequest(options);

  if (response.code == 0) {
    return {
      ok: true,
      code: response.code,
      error: null,
      imp_uid: response.response.imp_uid,
    };
  } else {
    return {
      ok: true,
      code: response.code,
      error: response.message,
      imp_uid: null,
    };
  }
};

/**
 * IamPort에 휴대폰 인증을 확인합니다.
 */
export const confirmCertification = async (
  imp_uid: String,
  otp: String
): Promise<ConfirmCertification> => {
  const Authorization = await getAuthToken();

  const options = {
    uri: `https://api.iamport.kr/certifications/otp/confirm/${imp_uid}`,
    method: "POST",
    form: {
      imp_uid,
      otp,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };

  const response: any = await sendRequest(options);

  if (response.code == 0) {
    return {
      ok: true,
      code: response.code,
      error: null,
      response: response.response,
    };
  } else {
    return {
      ok: true,
      code: response.code,
      error: response.message,
      response: null,
    };
  }
};

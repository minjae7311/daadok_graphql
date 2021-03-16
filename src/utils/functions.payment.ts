import request from "request";
import { PaymentResult, VerifyCreditResult } from "../types/graph";
import Credit from "../entities/Credit";

import dotenv from "dotenv";
import Payment from "../entities/Payment";
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
      "https://api.iamport.kr/users/getToken?_token=wlqRVzq03K1XHOyLD4GrPVByzeOWJx1fTs7O2xO5iP2ZEAKhFrJunl3WARTjoVzinG6pdVvwLxwp8gHN",
    method: "POST",
    form: {
      imp_key: process.env.IAMPORT_KEY,
      imp_secret: process.env.IAMPORT_SECRET,
    },
  });
  return authResponse.response.access_token;
};

/**
 * 결제 내역을 취소합니다.
 *
 * @param {Payment} payment
 */
export const cancelPayment = async (
  payment: Payment
): Promise<PaymentResult> => {
  if (!payment) {
    return {
      ok: false,
      error: "payment-not-passed",
      code: null,
      imp_uid: null,
    };
  }

  const { imp_uid } = payment;

  const Authorization = await getAuthToken();
  const options = {
    uri: `https://api.iamport.kr/payments/cancel`,
    method: "POST",
    form: {
      imp_uid,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };

  const response: any = await sendRequest(options);

  if (response.code == 0) {
    payment.status = "CANCELLED";
    await payment.save();

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
 * IamPort에 결제를 요청합니다.
 *
 * @param {Payment} payment 결제를 요청할 Payment 객체.
 * @param {string} flag 결제 id 구분. ex) 'initial' or 'final'
 */
export const requestPayment = async (
  payment: Payment,
  flag: string
): Promise<PaymentResult> => {
  if (!payment) {
    return {
      ok: false,
      code: null,
      error: "payment-not-found",
      imp_uid: null,
    };
  }

  if (!payment.credit) {
    return {
      ok: false,
      code: null,
      error: "credit-not-found",
      imp_uid: null,
    };
  }

  if (!payment.credit.user) {
    return {
      ok: false,
      code: null,
      error: "user-not-found",
      imp_uid: null,
    };
  }

  const Authorization = await getAuthToken();

  const options = {
    uri: `https://api.iamport.kr/subscribe/payments/again`,
    method: "POST",
    form: {
      merchant_uid: `${flag}${payment.credit.user.id}`,
      customer_uid: payment.credit.user.id,
      card_number: payment.credit.card_number,
      expiry: payment.credit.expiry,
      birth: payment.credit.user.birthDate,
      // amount: payment.price,
      amount: 100,
      name: `${payment.product.brandName} : ${payment.product.subtitle}`,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };

  const response: any = await sendRequest(options);

  if (response.code == 0) {
    const imp_uid = response.response.imp_uid;
    payment.imp_uid = imp_uid;
    payment.status = "PAYED";
    await payment.save();

    return {
      ok: true,
      code: response.code,
      error: null,
      imp_uid,
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
 * 카드를 인증합니다.
 *
 * @param {Credit} credit
 */
export const verifyCredit = async (
  credit: Credit,
  pwd: string
): Promise<VerifyCreditResult> => {
  const Authorization = await getAuthToken();

  const { card_number, expiry } = credit;
  const birth = credit.user.birthDate;

  if (!card_number || !expiry) {
    return {
      ok: false,
      error: "empty-infos",
      code: null,
      credit: null,
    };
  }

  const options = {
    uri: `https://api.iamport.kr/subscribe/customers/${credit.user.id}`,
    method: "POST",
    form: {
      card_number,
      expiry,
      birth,
      pwd_2digit: pwd,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };

  const response: any = await sendRequest(options);
  console.log(response);

  if (response.code == 0) {
    credit.nickname = credit.nickname
      ? credit.nickname
      : response.response.card_name;
    credit.card_name = response.response.card_name;

    await credit.save();

    return {
      ok: true,
      error: null,
      code: response.code,
      credit,
    };
  } else {
    return {
      ok: false,
      error: response.message,
      code: response.code,
      credit: null,
    };
  }
};

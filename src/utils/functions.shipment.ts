import request from "request";
import Shipment from "../entities/Shipment";

import dotenv from "dotenv";
dotenv.config();

const sendRequest = async (option: any) => {
  return new Promise((resolve, reject) => {
    request.get(option, (_err, res) => {
      resolve(JSON.parse(res.body));
    });
  });
};

export const getCourierList = async () => {
  const getCourierResponse: any = sendRequest({
    uri:
      "http://info.sweettracker.co.kr/api/v1/companylist?t_key=ilfPQhkYbLNeGQvLcTKIRA",
    method: "GET",
  });
  return getCourierResponse;
};

/**
 * 배송내역 조회
 **/
export const inquiryShipment = async (shipment: Shipment) => {
  if (!shipment) {
    return {
      ok: false,
      error: "shipment-not-registered",
      shipment: null,
    };
  }

  const options = {
    uri: `http://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=ilfPQhkYbLNeGQvLcTKIRA&t_code=${shipment.courier_code}&t_invoice=${shipment.tracking_number}`,
    method: "GET",
  };

  const response: any = await sendRequest(options);

  if (response) {
    return {
      ok: true,
      error: null,
      shipment: response,
    };
  } else {
    return {
      ok: false,
      error: "not-get-response",
      shipment: null,
    };
  }
};

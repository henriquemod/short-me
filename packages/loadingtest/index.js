import http from "k6/http";

import { sleep } from "k6";
import { ENDPOINT } from "./config.js";

export const options = {
  vus: 100,

  duration: "30s",
};

export default function () {
  http.get(`${ENDPOINT}/urls`);

  sleep(1);
}

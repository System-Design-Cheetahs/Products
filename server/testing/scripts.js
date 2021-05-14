import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 200,
  duration: '30s',
};

export default function () {
  http.get('http://localhost:3000/products');
  sleep(1);
}

//k6 run script.js
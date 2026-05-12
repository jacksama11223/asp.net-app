import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 500 },  // Tăng dần lên 500 users trong 30s
        { duration: '1m', target: 2000 },  // Duy trì và tăng lên 2000 users trong 1 phút
        { duration: '30s', target: 0 },    // Giảm dần về 0
    ],
};

export default function () {
    let res = http.get('http://141.253.114.218/api/public/courses');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(0.1); // Mỗi user nghỉ 100ms trước khi gởi request tiếp theo
}

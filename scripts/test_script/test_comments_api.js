const http = require('http');

const data = JSON.stringify({ content: 'test', parentCommentId: null });

const options = {
  hostname: '141.253.114.218',
  port: 3080,
  path: '/CommunityApi/ResourceDiscussion/3/comments',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();

const https = require('https');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Canon_in_D_Major_%28Pachelbel%29.ogg';
const file = fs.createWriteStream('public/audio/ambient-romance.ogg');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (redirectRes) => {
      redirectRes.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Audio file saved successfully:', fs.statSync('public/audio/ambient-romance.ogg').size, 'bytes');
      });
    });
  } else {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Audio file saved successfully:', fs.statSync('public/audio/ambient-romance.ogg').size, 'bytes');
    });
  }
}).on('error', (err) => {
  console.error('Audio download error:', err.message);
});

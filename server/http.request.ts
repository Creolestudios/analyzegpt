import https from 'node:https';
import { Observable, interval, map } from 'rxjs';
import { langData } from './app.service.js';

function sendOpenAIRequest(question) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OPEN_API_KEY,
        },
      },
      function (res) {
        let data = '';
        res.on('data', (chunk) => {
          const lines = chunk
            .toString()
            .split('\n')
            .filter((line) => line.trim() !== '');
          for (const line of lines) {
            const message = line.replace(/^data: /, '');
            if (message === '[DONE]') {
              process.stdout.write('\n\n');
              return; // Stream finished
            }
            try {
              const parsed = JSON.parse(message);
              process.stdout.write(parsed.choices[0].text);
              data += parsed.choices[0].text;
            } catch (error) {
              console.error(
                'Could not JSON parse stream message',
                message,
                error,
              );
            }
          }
        });
        res.on('end', () => {
          resolve(data);
        });
      },
    );

    req.on('error', (e) => {
      reject(e);
    });

    const body = JSON.stringify({
      model: 'text-davinci-003',
      prompt: question,
      temperature: 1,
      max_tokens: 2000,
      // top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.7,
      stream: true,
    });

    req.write(body);
    req.end();
  });
}

export class s {
  static data = '';
}

// export let data = '';
function sendOpenAIRequestS(question) {
  // s.data = langData;
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OPEN_API_KEY,
        },
      },
      function (res) {
        res.on('data', (chunk) => {
          const lines = chunk
            .toString()
            .split('\n')
            .filter((line) => line.trim() !== '');
          for (const line of lines) {
            const message = line.replace(/^data: /, '');
            if (message === '[DONE]') {
              return; // Stream finished
            }
            try {
              const parsed = JSON.parse(message);
              s.data += parsed.choices[0].text;
              // return interval(1000).pipe(
              //   map((_) => ({ data: parsed.choices[0].text } as MessageEvent)),
              // );
              process.stdout.write(parsed.choices[0].text);
            } catch (error) {
              console.error(
                'Could not JSON parse stream message',
                message,
                error,
              );
            }
          }
        });
        res.on('end', () => {
          resolve(s.data);
        });
      },
    );

    req.on('error', (e) => {
      reject(e);
    });

    const body = JSON.stringify({
      model: 'text-davinci-003',
      prompt: question,
      temperature: 1,
      max_tokens: 1500,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.7,
      stream: true,
    });

    req.write(body);
    req.end();
  });
}

export { sendOpenAIRequest, sendOpenAIRequestS };

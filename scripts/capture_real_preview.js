const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function captureAll(targets) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-tab-'));
  const port = 9444;

  console.log('Launching headless Chrome on port', port);
  const chromeProc = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      `--user-data-dir=${tempDir}`,
      '--hide-scrollbars',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let tabWsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(300);
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const list = await res.json();
        const pageTab = list.find((t) => t.type === 'page');
        if (pageTab && pageTab.webSocketDebuggerUrl) {
          tabWsUrl = pageTab.webSocketDebuggerUrl;
          break;
        }
      }
    } catch (_) {}
  }

  if (!tabWsUrl) {
    chromeProc.kill();
    throw new Error('Could not find active page tab');
  }

  console.log('Connecting to page tab WebSocket:', tabWsUrl);
  const ws = new WebSocket(tabWsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const payload = JSON.stringify({ id, method, params });

      const timeout = setTimeout(() => {
        ws.removeEventListener('message', onMessage);
        reject(new Error(`Timeout waiting for ${method} (id=${id})`));
      }, 15000);

      function onMessage(evt) {
        const res = JSON.parse(evt.data);
        if (res.id === id) {
          clearTimeout(timeout);
          ws.removeEventListener('message', onMessage);
          if (res.error) {
            reject(new Error(`${method} error: ${JSON.stringify(res.error)}`));
          } else {
            resolve(res.result);
          }
        }
      }

      ws.addEventListener('message', onMessage);
      ws.send(payload);
    });
  }

  await send('Page.enable');

  for (const target of targets) {
    console.log(`\nCapturing [${target.name}] -> ${target.url} (${target.width}x${target.height})`);

    // Override viewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: target.width,
      height: target.height,
      deviceScaleFactor: target.scale || 1.5,
      mobile: target.mobile || false,
    });

    if (target.userAgent) {
      await send('Network.setUserAgentOverride', {
        userAgent: target.userAgent,
      });
    }

    // Navigate
    await send('Page.navigate', { url: target.url });
    await sleep(target.wait || 3500);

    // Capture screenshot
    const res = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const buf = Buffer.from(res.data, 'base64');
    fs.writeFileSync(target.outPath, buf);
    console.log(`Successfully saved ${target.outPath} (${buf.length} bytes)`);
  }

  ws.close();
  chromeProc.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (_) {}
  console.log('\nAll previews successfully generated!');
}

const outDir = path.join(__dirname, '..', 'public', 'projects');

const targets = [
  // Brasa
  {
    name: 'Brasa Desktop',
    url: 'https://brasa-taupe.vercel.app/',
    width: 1440,
    height: 900,
    scale: 1.5,
    mobile: false,
    wait: 3500,
    outPath: path.join(outDir, 'brasa_desktop.png'),
  },
  {
    name: 'Brasa Tablet',
    url: 'https://brasa-taupe.vercel.app/',
    width: 768,
    height: 1024,
    scale: 1.5,
    mobile: false,
    wait: 3000,
    outPath: path.join(outDir, 'brasa_tablet.png'),
  },
  {
    name: 'Brasa Mobile',
    url: 'https://brasa-taupe.vercel.app/',
    width: 390,
    height: 844,
    scale: 2,
    mobile: false, // set false to avoid touch emulation freeze
    wait: 3000,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    outPath: path.join(outDir, 'brasa_mobile.png'),
  },
  // Lafto Lounge
  {
    name: 'Lafto Lounge Desktop',
    url: 'https://lafto-lounge-restaurant.vercel.app/',
    width: 1440,
    height: 900,
    scale: 1.5,
    mobile: false,
    wait: 4000,
    outPath: path.join(outDir, 'lafto_desktop.png'),
  },
  {
    name: 'Lafto Lounge Tablet',
    url: 'https://lafto-lounge-restaurant.vercel.app/',
    width: 768,
    height: 1024,
    scale: 1.5,
    mobile: false,
    wait: 3500,
    outPath: path.join(outDir, 'lafto_tablet.png'),
  },
  {
    name: 'Lafto Lounge Mobile',
    url: 'https://lafto-lounge-restaurant.vercel.app/',
    width: 390,
    height: 844,
    scale: 2,
    mobile: false,
    wait: 3500,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    outPath: path.join(outDir, 'lafto_mobile.png'),
  },
];

captureAll(targets).catch((err) => {
  console.error(err);
  process.exit(1);
});

import 'regenerator-runtime/runtime';
import EasySeeso from './seeso-minjs/easy-seeso';
import {TrackingState} from './seeso-minjs/seeso.min';

const startBtn = document.getElementById('startButton');

const licenseKey = 'dev_2us7by9otf5x3r3gnwj40dirkai3f7yrzq7rtrq1';
const userId = '61e4ef2fb9c57d2995f4590e';
const seeso = new EasySeeso();

const initSeeSo = async () => {
  // Don't forget to enter your license key.
  await seeso.init(licenseKey, afterInitialized, afterFailed);
  // setCalibrationDataOnSeeSoSDK(seeso);
};

const afterInitialized = async () => {
  console.log('sdk init success!');
  await seeso.startTracking(onGaze);
};

function afterFailed() {
  console.log('sdk init fail!');
}

// in redirected page
// function parseCalibrationDataInQueryString() {
//   const href = window.location.href;
//   console.log(href);
//   const decodedURI = decodeURI(href);
//   const queryString = decodedURI.split('?')[1];

//   if (!queryString) return undefined;
//   const jsonString = queryString.slice(
//     'calibrationData='.length,
//     queryString.length,
//   );
//   return jsonString;
// }

// function setCalibrationDataOnSeeSoSDK(seeso) {
//   console.log(seeso);
//   const calibrationData = parseCalibrationDataInQueryString();
//   seeso.setCalibrationData(calibrationData);
// }

function onGaze(gazeInfo) {
  if (gazeInfo.trackingState === TrackingState.SUCCESS) {
    let canvas = document.getElementById('output');
    canvas.width = window.innerWidth - 500;
    canvas.height = window.innerHeight - 500;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(gazeInfo.x, gazeInfo.y, 10, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

if (startBtn) {
  startBtn.addEventListener('click', initSeeSo);
}

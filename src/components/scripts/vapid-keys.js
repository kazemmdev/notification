// vapid-keys.js
import { generateVAPIDKeys } from 'web-push';

const vapidKeys = generateVAPIDKeys();
console.log('VAPID Public Key:', vapidKeys.publicKey);
console.log('VAPID Private Key:', vapidKeys.privateKey);
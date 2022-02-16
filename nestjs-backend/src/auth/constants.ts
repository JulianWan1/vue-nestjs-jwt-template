import * as fs from 'fs';
import * as path from 'path';

require('dotenv').config();

// secret is for symmetrical key signing 
// currently using asymmetrical key signing (priv and pub key)
// set the path to refer to the keys directory OUTSIDE of the dist directory
const pathToPublicKey = path.join(__dirname, '../../src/keys', 'id_rsa_pub.pem');
const pathToPrivateKey = path.join(__dirname, '../../src/keys', 'id_rsa_priv.pem');
const PUB_KEY = fs.readFileSync(pathToPublicKey, 'utf8');
const PRIV_KEY = fs.readFileSync(pathToPrivateKey, 'utf8');

export const jwtConstants = {
  privateKey: PRIV_KEY,
  publicKey: PUB_KEY,
  secret: process.env.SECRET_KEY,
};
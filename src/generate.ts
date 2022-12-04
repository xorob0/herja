import generateEntities from "./utils/generate-entities";
import { connect } from "./connexion";
import fs from 'fs'

export const generate =  async ({url, access_token, path}: {
  url: string;
  access_token: string;
  path: string;
}) => {
  const {states} = await connect({url, access_token});
  await generateEntities({config:{path, states}})
  console.log('Entites generated');
}

const args = process.argv.slice(2);
const configFile = args[0] || './herja.config.json'
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'))
const {url, access_token, path} = config;

if(!access_token || !url || !path) {
  throw new Error('You need to specify API_URL and API_TOKEN');
}

generate({path , access_token, url }).then(()=> process.exit(0))

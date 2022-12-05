import { KeyOfAsString } from "../keyOfAsString";
import {
  MediaPlayerEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const media_player: Record<string,KeyOfAsString<MediaPlayerEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, MediaPlayer, MediaPlayerProperties, Media} from "@herja/core"
export type MediaPlayerIDs = "${Object.keys(media_player).join('" | "')}"
export type MediaPlayerEntities = Record<MediaPlayerIDs, MediaPlayer>`

export const media_playerHandler = (entity: {entity_id:string}) =>{
  media_player[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as MediaPlayerProperties}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.media_player}", "turn_on", {}, {entity_id: "${entity.entity_id}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.media_player}", "turn_off", {}, {entity_id: "${entity.entity_id}"})}`,
    playMedia: `playMedia(media:Media) { return callService("${HAEntityTypes.media_player}", "play_media", media, {entity_id: "${entity.entity_id}"})}`,
    selectSource: `selectSource(source:string) { return callService("${HAEntityTypes.media_player}", "select_sound", {source}, {entity_id: "${entity.entity_id}"})}`,
    selectSoundMode: `selectSoundMode(sound_mode:string) { return callService("${HAEntityTypes.media_player}", "select_sound_mode", {}, {entity_id: "${entity.entity_id}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const media_player: MediaPlayer<MediaPlayerIDs> = {
${Object.entries(media_player).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeMediaPlayer = async(path:string) => {
  if(Object.keys(media_player).length === 0) {
    return
  }
  await outputFile(path, getFile())
}

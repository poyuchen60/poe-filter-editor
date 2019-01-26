const color = (str) => {
  const reg = /(\d{1,3}) +(\d{1,3}) +(\d{1,3}) *(\d{1,3})? *(#.+)?/;
  const match = reg.exec(str);
  if(match){
    const color = {};
    color.r = Number(match[1]);
    color.g = Number(match[2]);
    color.b = Number(match[3]);
    color.a = Number(match[4] || 255) / 255;
    color.comment = match[5] && match[5].replace(/^# */, '')
    return color;
  }
  return undefined;
}
const comparison = (validation) => (str) => {
  const reg = /(<|>|<=|>=|=)? *([a-zA-Z0-9]+) *(#.+)?/;
  const match = reg.exec(str);
  const value = match && validation(match[2])
  if(value || value === 0){
    return {
      operator: match[1] || "=",
      value,
      comment: match[3] && match[3].replace(/^# */, '')
    }
  }
  return undefined;
}
const validNumber = (str) => Number(str);
const validRarity = (str) => /^(Normal|Magic|Rare|Unique)$/.test(str) && str;

const twoQuotes = (str) => {
  const removeSpace = str.split('"').map(e => e.trim()).filter(e => e.length > 0);
  const removeDuplicate = Array.from(new Set(removeSpace));
  return removeDuplicate;
};

const single = validation => (str) => {
  const reg = /([a-zA-Z0-9]+) *(#.+)?/;
  const match = reg.exec(str);
  const value = match && validation(match[1]);
  if(value){
    return {
      value,
      comment: match[2] && match[2].replace(/^# */, '')
    }
  }
  return undefined;
}
const validSocketGroup = (str) => /^[RGBW]+$/.test(str) && str;
const validFontSize = (str) => {
  const size = Number(str);
  return (size > 45 && 45) || (size < 18 && 18) || size
}
const playEffect = (str) => {
  const reg = /(Red|Green|Blue|Brown|White|Yellow) *(Temp)? *(#.+)?/;
  const match = reg.exec(str);
  if(match){
    return {
      color: match[1],
      temp: Boolean(match[2]),
      comment: match[3] && match[3].replace(/^# */, '')
    }
  }
  return undefined;
}
const playAlertSound = (str) => {
  const reg = /(\d{1,2}) +(\d{1,3}) *(#.+)?/;
  const match = reg.exec(str);
  if(match){
    const id = Number(match[1]);
    let volume = Number(match[2]);
    volume = (volume > 300 && 300) || (volume < 0 && 0) || volume;
    return {
      id, volume,
      comment: match[3] && match[3].replace(/^# */, '')
    }
  }
  return undefined;
}
const minimapIcon = (str) => {
  const reg = /([012]) +(Red|Green|Blue|Brown|White|Yellow) +(Circle|Diamond|Hexagon|Square|Star|Triangle) *(#.+)?/
  const match = reg.exec(str);
  if(match){
    const size = Number(match[1]);
    const color = match[2];
    const shape = match[3];
    const comment = match[4] && match[4].replace(/^# */, '');
    return {size, color, shape, comment};
  }
  return undefined;
}
const description = (str) => {
  const reg = /^# *(.+)$/;
  const match = reg.exec(str);
  return match ? match[1] : undefined;
}
const bool = str => str === "True";

const handlers = {
  "SetTextColor": color,
  "SetBorderColor": color,
  "SetBackgroundColor": color,
  "Corrupted": bool,
  "ShaperItem": bool,
  "ElderItem": bool,
  "Identified": bool,
  "ElderMap": bool,
  "ShapedMap": bool,
  "DisableDropSound": bool,
  "BaseType": twoQuotes,
  "Class": twoQuotes,
  "HasExplicitMod": twoQuotes,
  "ItemLevel": comparison(validNumber),
  "DropLevel": comparison(validNumber),
  "Width": comparison(validNumber),
  "Height": comparison(validNumber),
  "StackSize": comparison(validNumber),
  "GemLevel": comparison(validNumber),
  "Quality": comparison(validNumber),
  "Rarity": comparison(validRarity),
  "MapTier": comparison(validNumber),
  "LinkedSockets": comparison(validNumber),
  "Sockets": comparison(validNumber),
  "SocketGroup": single(validSocketGroup),
  "SetFontSize": single(validFontSize),
  "PlayEffect": playEffect,
  "PlayAlertSound": playAlertSound,
  "MinimapIcon": minimapIcon,

  "Show": description,
  "Hide": description,
}


const Parser = (data) => {
  data = data.replace(/\r\n/g, "\n").replace(/\t/g, "  ");
  const lines = data.split("\n").map( l => l.trim());

  const filter = [];
  let block;
  lines.forEach( line => {
    if(line[0] !== '#' && line.length > 0){
      const keyWordReg = /^(\w+) */g;
      const match = keyWordReg.exec(line);
      const firstWord = match[1];
      const left = line.slice(keyWordReg.lastIndex);
      const handler = handlers[firstWord];
      if(firstWord === 'Show' || firstWord === 'Hide'){
        const display = firstWord === "Show";
        const description = handler(left);
        filter.push(block = {display, description});
      } else {
        block[firstWord] = handler ? handler(left) : console.log(firstWord) && left;
      }
    }
  })
  return filter;
}

export default Parser;
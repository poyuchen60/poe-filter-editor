const color = value => {
  const { r, g, b, a } = value;
  return `${r} ${g} ${b} ${(a * 255).toFixed(0)}`
};
const bool = value => value ? "True" : "False";
const twoQuotes = value => value.map(ele => `"${ele}"`).join(' ');
const comparison = value => `${value.operator} ${value.value}`;
const single = value => String(value.value);
const playEffect = value => {
  const { color, temp } = value;
  const append = temp ? " true" : "";
  return color + append;
};
const playAlertSound = value => `${value.id} ${value.volume}`;
const minimapIcon = value => `${value.size} ${value.color} ${value.shape}`;

const order = {
  "Corrupted": 0,
  "Identified": 1,

  "ShaperItem": 2,
  "ElderItem": 3,

  "ShapedMap": 4,
  "ElderMap": 5,

  "LinkedSockets": 6,
  "Sockets": 7,
  "SocketGroup": 8,

  "MapTier": 9,
  "ItemLevel": 10,
  "DropLevel": 11,
  "Width": 12,
  "Height": 13,
  "StackSize": 14,
  "GemLevel": 15,
  "Quality": 16,
  "Rarity": 17,
  
 
  "BaseType": 18,
  "Class": 19,
  "HasExplicitMod": 20,

  "SetFontSize": 21,
  "SetTextColor": 22,
  "SetBorderColor": 23,
  "SetBackgroundColor": 24,

  "PlayEffect": 25,
  "MinimapIcon": 26,
  "PlayAlertSound": 27,
  "DisableDropSound": 28,
}

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
  "ItemLevel": comparison,
  "DropLevel": comparison,
  "Width": comparison,
  "Height": comparison,
  "StackSize": comparison,
  "GemLevel": comparison,
  "Quality": comparison,
  "Rarity": comparison,
  "MapTier": comparison,
  "LinkedSockets": comparison,
  "Sockets": comparison,
  "SocketGroup": single,
  "SetFontSize": single,
  "PlayEffect": playEffect,
  "PlayAlertSound": playAlertSound,
  "MinimapIcon": minimapIcon,
}
const covertBlockToText = block => {
  const { display, description } = block;
  let output = (display ? "Show" : "Hide");
  output = description ? `${output} #${description}\n` : `${output}\n`;
  return Object.keys(block)
    .filter( prop => prop !== 'description' && prop !== 'display')
    .sort((a,b) => order[a] - order[b])
    .reduce(
      (accu, prop) => accu + `  ${prop} ${handlers[prop](block[prop])}\n`, 
      output
    );
}
const Builder = filter => filter.reduce( (text, b) => {
  return text + covertBlockToText(b) + "\n";
}, "");
// const Builder = (obj) => {
//   const filter = obj.map( b => b.modified || b.origin);
  // const filter = obj.reduce( (accu, b) => {
  //   const final = b && (b.modified || b.origin);
  //   final && accu.push(final);
  //   return accu;
  // }, []);
//   const text = filter.reduce( (t, b) => {
//     return t + covertBlockToText(b) + "\n";
//   }, "");
//   return text;
// }

export default Builder;
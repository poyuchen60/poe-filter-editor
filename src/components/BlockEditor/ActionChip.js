import React from 'react';
import Chip from '@material-ui/core/Chip';
const Size = ({
  0: "大", 1: "中", 2: "小"
});
const Color = ({
  Red: "紅", Green: "綠", Blue: "藍",
  Brown: "棕", White: "白", Yellow: "黃",
});
const Shape =({
  Circle: "圓形", Diamond: "菱形", Hexagon: "六角形",
  Square: "方形", Star: "星形", Triangle: "三角形"
})

const MinimapIconChip = (props) => {
  const { setting, onDelete } = props;
  if(setting){
    const { size, color, shape } = setting;
    return <Chip
      label={`地圖標誌: ${Size[size]} ${Color[color]} ${Shape[shape]}`}
      onDelete={onDelete}
    />
  }
  return null;
}
const PlayAlertSoundChip = (props) => {
  const { setting, onDelete } = props;
  if(setting){
    const { id, volume } = setting;
    return <Chip
      label={`掉落音效: ${id} ${volume}`}
      onDelete={onDelete}
    />
  }
  return null;
}
const PlayEffectChip = (props) => {
  const { setting, onDelete } = props;
  if(setting){
    const { color, temp } = setting;
    return <Chip
      label={`光束特效: ${color}${temp ? " 暫時" : " 永久"}`}
      onDelete={onDelete}
    />
  }
  return null;
}

export { MinimapIconChip, PlayAlertSoundChip, PlayEffectChip };
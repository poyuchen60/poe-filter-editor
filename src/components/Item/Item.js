import React from 'react';


const Item = (props) => {
  const {textColor, borderColor, backgroundColor, fontSize} = props
  const [textColorRGB, borderColorRGB, backgroundColorRGB] = [textColor, borderColor, backgroundColor].map(
    c => c ? `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})` : undefined
  );
  const style = {display: "inline-flex", padding: "5px"};
  style.color = textColorRGB || "white";
  style.border = borderColorRGB ? `1px solid ${borderColorRGB}` : "";
  style.backgroundColor = backgroundColorRGB || "rgba(0, 0, 0, 0.8)";
  style.fontSize = `${ (fontSize ? fontSize.value : 32) / 2}px`;
  return (
    <div style={style}>
      <span>ItemTest</span>
    </div>
  )
}

export default Item;
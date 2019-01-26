const conditions =  {
  "Basic":[
    "description", "display"
  ],
  "Constraint":[
    "MapTier", "Quality", "Rarity", "Height", "Width", "StackSize",
    "GemLevel", "ItemLevel", "DropLevel"
  ],
  "Ary": [
    "Class", "BaseType", "HasExplicitMod"
  ],
  "Socket":[
    "Sockets", "LinkedSockets", "SocketGroup"
  ],
  "Type": [
    "Identified", "Corrupted",
    "ElderItem", "ShaperItem", "ElderMap", "ShapedMap"
  ],
  "Action": [
    "SetBorderColor", "SetTextColor", "SetBackgroundColor",
    "SetFontSize",
    "PlayAlertSound", "PlayAlertSoundPositional", "DisableDropSound",
    "CustomAlertSound", "MinimapIcon", "PlayEffect"
  ]
}

export { conditions };
const conditions =  {
  "Constraint":[
    "MapTier", "Quality", "Rarity", "Height", "Width", "StackSize",
    "GemLevel", "ItemLevel", "DropLevel"
  ],
  "Array": [
    "Class", "BaseType", "HasExplicitMod"
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
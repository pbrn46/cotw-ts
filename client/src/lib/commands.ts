

export type CommandType = "closeDoor" | "targetSpell"

const commandLabels: Record<CommandType, string> = {
  closeDoor: "Close Door",
  targetSpell: "Spell",
}

export function getCommandLabel(command: CommandType) {
  const label = commandLabels[command]
  if (!label) throw new Error("Command label not found")
  return label
}
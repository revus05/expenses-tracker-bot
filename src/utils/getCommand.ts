type GetCommand = (commands: string, findCommand: string) => string | null

const getCommand: GetCommand = (commands, findCommand) => {
  const commandsArray = commands.split('|')
  for (let i = 0; i < commandsArray.length; i++) {
    if (commandsArray[i].includes(findCommand)) {
      return commandsArray[i]
    }
  }
  return null
}

export default getCommand

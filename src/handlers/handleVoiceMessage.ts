import { MyContext } from '../utils/bot'

type HandleVoiceMessage = (ctx: MyContext) => Promise<void>

const handleVoiceMessage: HandleVoiceMessage = async () => {}

export default handleVoiceMessage

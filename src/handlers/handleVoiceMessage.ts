import { MyContext } from '../index'

type HandleVoiceMessage = (ctx: MyContext) => Promise<void>

const handleVoiceMessage: HandleVoiceMessage = async () => {}

export default handleVoiceMessage

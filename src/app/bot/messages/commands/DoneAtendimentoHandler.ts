import { Message } from 'whatsapp-web.js';
import OrderHandlerCache from '../../cache/OrderHandlerCache';
import { HelperCommands } from '../../utils/HelperCommands';

export const DoneAtendimentoHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    if (!HelperCommands.checkIfIsAdmin(msg.from)) {
      return msg.reply('Sorry! You do not have permission to use this command. ❌');
    }

    const splited_body = msg.body.split(' ');
    const atendido = splited_body[1];
    if (atendido === undefined) {
      return msg.reply('To close a service, please type *#encerra <name of the requester>* ❌');
    }

    if (!(await OrderHandlerCache.setAtendimentoToFinish(atendido.toLowerCase()))) {
      return msg.reply('No service found! ❌');
    }

    return msg.reply('Service successfully closed ✅');
  },
};

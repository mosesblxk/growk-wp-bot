import type { Message } from 'whatsapp-web.js';
import { AnyMessageHandler } from './AnyMessageHandler';
import { OrderMessageHandler } from './OrderMessageHandler';
import HelperStr from '../utils/HelperStr';

export const ConfirmDataStatusHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    if (HelperStr.formatMessageToCheck(msg.body) == 'sim') {
      const status_to_update = 'address-data';
      if (!OrderMessageHandler.updateStatusOder(msg, status_to_update)) {
        console.log('Erro ao atualizar o status: ', status_to_update);
      }

      await chat.sendMessage(
        `Now we need you to provide some delivery and payment details. It will be quick.`,
      );

      return msg.reply(`Please tell us your preferred delivery method: *Delivery* or *Pickup?*`);
    } else if (HelperStr.formatMessageToCheck(msg.body) == 'nao') {
      const status_to_update = 'created';
      if (!OrderMessageHandler.updateStatusOder(msg, status_to_update)) {
        console.log('Error updating the status: ', status_to_update);
      }

      return msg.reply(
        `Okay. No problem. Update the items in your cart and we'll take care of the rest :).`,
      );
    }

    return AnyMessageHandler.execute(msg);
  },
};

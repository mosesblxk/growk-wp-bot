import type { Message } from 'whatsapp-web.js';
import { AnyMessageHandler } from './AnyMessageHandler';
import { OrderMessageHandler } from './OrderMessageHandler';
import HelperStr from '../utils/HelperStr';

export const OrderAddressHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    if (HelperStr.formatMessageToCheck(msg.body) == 'delivery') {
      const status_to_update = 'delivery-fee';
      if (
        !OrderMessageHandler.setDeliveryMethodToOrder(
          HelperStr.formatMessageToCheck(msg.body),
          status_to_update,
          msg,
        )
      ) {
        console.log(
          'Error setting the delivery method: ',
          HelperStr.formatMessageToCheck(msg.body),
        );
      }

      await chat.sendMessage(
        `Alright! We will send your order securely within the delivery time to the comfort of your home.`,
      );

      return msg.reply(`Now we need you to select your neighborhood by *typing a number between 1 and 5* 
      \n\n*Neighborhoods:*
      \n1. Shangrila - fee: *R$ 5.00*
      \n2. Ipanema - fee: *R$ 8.00*
      \n3. Pontal do Sul - fee: *R$ 10.00*
      \n4. Santa Terezinha - fee: *R$ 12.00*
      \n5. Praia de Leste - fee: *R$ 15.00*
      \nChoose the one that is *closest to your neighborhood*
      \n\nYou can also type *#help* to learn more
      `);
    } else if (HelperStr.formatMessageToCheck(msg.body) == 'pickup') {
      const status_to_update = 'payment-data';
      if (
        !OrderMessageHandler.setDeliveryMethodToOrder(
          HelperStr.formatMessageToCheck(msg.body),
          status_to_update,
          msg,
        )
      ) {
        console.log(
          'Error setting the delivery method: ',
          HelperStr.formatMessageToCheck(msg.body),
        );
      }

      await chat.sendMessage(
        `Alright! You will be notified as soon as your order is ready for pickup :).`,
      );

      return msg.reply(`Now we need to fill in some *payment* details. 
      \nPlease tell us your preferred payment method: *Card*, *Cash* or *Pix*?`);
    }

    return AnyMessageHandler.execute(msg);
  },
};

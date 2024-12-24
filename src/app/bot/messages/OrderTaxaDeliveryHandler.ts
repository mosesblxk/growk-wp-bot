import type { Message } from 'whatsapp-web.js';
import { AnyMessageHandler } from './AnyMessageHandler';
import { OrderMessageHandler } from './OrderMessageHandler';

export const OrderTaxaDeliveryHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    if (Number(msg.body) != 0 && Number(msg.body) <= 5) {
      const status_to_update = 'delivery-data';

      if (
        !OrderMessageHandler.setBairroToOrder(
          status_to_update,
          Number(msg.body),
          msg,
        )
      ) {
        console.log('Error saving location in cache.');
      }

      await chat.sendMessage(
        'Thank you. Your neighborhood has been registered and the delivery fee applied ;).',
      );

      return msg.reply(`We need you to send us your *location*
      \nTo do this, follow these simple steps:
      \n1. Make sure the *location service* is *enabled* on your phone
      \n2. Click on the 🔗 icon above the keyboard
      \n3. Click on location
      \n4. Finally, click on *Current Location* (located below the title *Nearby locations*)
      `);
    }

    return AnyMessageHandler.execute(msg);
  },
};

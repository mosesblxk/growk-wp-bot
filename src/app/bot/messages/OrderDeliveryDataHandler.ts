import type { Message } from 'whatsapp-web.js';
import { AnyMessageHandler } from './AnyMessageHandler';
import { OrderMessageHandler } from './OrderMessageHandler';

export const OrderDeliveryDataHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    if (msg.type == 'location') {
      const status_to_update = 'payment-data';

      if (
        !OrderMessageHandler.setAddressLocationToOrder(
          msg.location.latitude,
          msg.location.longitude,
          status_to_update,
          msg,
        )
      ) {
        console.log('Error saving location in cache.');
      }

      await chat.sendMessage('Thank you. Your location data has been securely recorded.');

      return msg.reply(`Now we need to fill in some *payment* details. 
    \nPlease tell us your preferred payment method: *Card*, *Cash*, or *Pix*?`);
    }

    return AnyMessageHandler.execute(msg);
  },
};

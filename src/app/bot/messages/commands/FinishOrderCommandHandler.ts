import type { Message } from 'whatsapp-web.js';
import OrderHandlerCache from '../../cache/OrderHandlerCache';
import { IOrder } from '../../interfaces/Order';
import HelperCurrency from '../../utils/HelperCurrency';
import { OrderMessageHandler } from '../OrderMessageHandler';

export const FinishOrderCommandHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    let obj: IOrder;
    try {
      // @ts-ignore
      obj = await OrderHandlerCache.getOrderFromMessage(msg.from);
    } catch (e) {
      console.log(e);
      return msg.reply('Oops! No order found for finalization. ❌');
    }

    const status_to_update = 'confirm-data';
    if (!OrderMessageHandler.updateStatusOder(msg, status_to_update)) {
      console.log('Error updating status: ', status_to_update);
    }

    const items_to_print = obj.items.map((item) => {
      return `
      •${item.name}:
      →Quantity: ${item.quantity}
      →Price: *${HelperCurrency.priceToString(Number(item.price))}*\n`;
    });

    /**
     * @todo
     * When buttons work: first send a message with the data, then send a confirmation button.
     */
    return msg.reply(`*ORDER DETAILS*
      \n*Customer:*
      •Name: ${obj.name}
      •Contact number: ${obj.contact_number}
      \n*Cart:*${items_to_print}
      \nTotal Purchase: *${HelperCurrency.priceToString(Number(obj.total))}*
      \n*Do you want to confirm the order?*
    `);
  },
};

import { Message } from 'whatsapp-web.js';
import OrderHandlerCache from '../../cache/OrderHandlerCache';
import { IOrder } from '../../interfaces/Order';
import HelperCurrency from '../../utils/HelperCurrency';

export const InfoOrderCommandHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    let obj: IOrder;
    try {
      // @ts-ignore
      obj = await OrderHandlerCache.getOrderFromMessage(msg.from);
    } catch (e) {
      console.log(e);
      return msg.reply('Oops! No order found for you to view. ❌');
    }

    const items_to_print = obj.items.map((item) => {
      return `
      •${item.name}:
      →Quantity: ${item.quantity}
      →Price: *${HelperCurrency.priceToString(Number(item.price))}*\n`;
    });

    const order_data = `*ORDER DATA*
    \n*Order Number*: ${obj.identifier}
    \n*Customer:*
    •Name: ${obj.name}
    •Contact number: ${obj.contact_number}
    \n*Cart:*${items_to_print}
    *Delivery Details:*
    •Delivery method: ${obj.delivery_method}
    •Delivery neighborhood: ${obj.location.bairro}
    \n*Payment Details:*
    •Payment method: ${obj.payment_method}
    •Payment status: ${obj.payment_status}
    •Delivery fee: ${obj.location.taxa_entrega}
    \n*Order Status:* ${obj.status}
    \nTotal Purchase: *${HelperCurrency.priceToString(Number(obj.total))}*
    \n*Created At:* ${obj.created_at}
    \n*Last Updated:* ${obj.updated_at}
    `;

    await chat.sendMessage(order_data);
    return msg.reply(
      'This is your active order at the moment. If you want to make a new order, just send us a new cart: *#car*',
    );
  },
};

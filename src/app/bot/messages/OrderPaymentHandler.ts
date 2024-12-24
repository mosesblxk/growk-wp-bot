import { Message } from 'whatsapp-web.js';
import { AnyMessageHandler } from './AnyMessageHandler';
import { OrderMessageHandler } from './OrderMessageHandler';
import type { IOrder } from '../interfaces/Order';
import OrderHandlerCache from '../cache/OrderHandlerCache';
import HelperCurrency from '../utils/HelperCurrency';
import HelperStr from '../utils/HelperStr';
import { production_message } from '../utils/ReturnsMessages';
import { HelperOrderProduction } from '../utils/HelperOrderProduction';
import { HelperPaymentPix } from '../utils/HelperPaymentPix';

export const OrderPaymentHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    if (HelperStr.formatMessageToCheck(msg.body) == 'pix') {
      const status_to_update = 'pix-pendente';
      if (
        !OrderMessageHandler.setPaymentMethodToOrder(
          HelperStr.formatMessageToCheck(msg.body),
          status_to_update,
          msg,
        )
      ) {
        console.log('Error setting payment method: ', HelperStr.formatMessageToCheck(msg.body));
      }

      // @ts-ignore
      const obj: IOrder = await OrderHandlerCache.getOrderFromMessage(msg.from);

      await HelperPaymentPix.genPaymentPixFromOrder(obj, msg.from);
    } else if (
      HelperStr.formatMessageToCheck(msg.body) == 'card' ||
      HelperStr.formatMessageToCheck(msg.body) == 'cash'
    ) {
      const status_to_update = 'production';
      if (
        !OrderMessageHandler.setPaymentMethodToOrder(
          HelperStr.formatMessageToCheck(msg.body),
          status_to_update,
          msg,
        )
      ) {
        console.log('Error setting payment method: ', HelperStr.formatMessageToCheck(msg.body));
      }
      // @ts-ignore
      const obj: IOrder = await OrderHandlerCache.getOrderFromMessage(msg.from);

      await chat.sendMessage(
        `Thank you. You will make the payment of *${HelperCurrency.priceToString(
          Number(obj.total),
        )}* at the time of delivery or pickup.`,
      );

      HelperOrderProduction.create({ message_from: msg.from });

      return msg.reply(production_message);
    }
    return AnyMessageHandler.execute(msg);
  },
};

import { Message } from 'whatsapp-web.js';
import { queryOrder } from '../../../usecases/query-orders';
import { IOrder } from '../../interfaces/Order';
import { HelperCommands } from '../../utils/HelperCommands';
import { HelperPaymentPix } from '../../utils/HelperPaymentPix';

export const CreatePaymentPixCommand = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    // Check if the user is an admin
    if (!HelperCommands.checkIfIsAdmin(msg.from)) {
      return msg.reply('Sorry! You do not have permission to use this command. ❌');
    }

    // Split the message body to get the order ID
    const splited_body = msg.body.split(' ');
    const order_id = splited_body[1];

    // Ensure the order ID is provided
    if (order_id === undefined) {
      return msg.reply('To generate a Pix payment, type *#pix <order id e.g. *5*> ❌');
    }

    // Retrieve order data from the database
    const order_data_from_db: IOrder = await queryOrder.selectOrderById(Number(order_id));

    // Generate the Pix payment from the order data
    await HelperPaymentPix.genPaymentPixFromOrder(order_data_from_db, msg.from, true);

    return msg.reply('Payment generated successfully! ✅');
  },
};

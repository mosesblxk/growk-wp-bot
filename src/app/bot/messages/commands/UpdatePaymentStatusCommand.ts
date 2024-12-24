import { Message } from 'whatsapp-web.js';
import { HelperCommands } from '../../utils/HelperCommands';

export const UpdatePaymentStatusCommand = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    // Check if the user is an admin
    if (!HelperCommands.checkIfIsAdmin(msg.from)) {
      return msg.reply('Sorry! You do not have permission to use this command. ❌');
    }

    // Split the message body to get the order ID and the new payment status
    const splited_body = msg.body.split(' ');
    const order_id = splited_body[1];
    const status_to_update = splited_body[2];

    // Ensure both the order ID and the status are provided
    if (order_id === undefined || status_to_update === undefined) {
      return msg.reply(
        'To update a payment status, type *#pay <order id e.g. *5*> <status: paid or pending>* ❌',
      );
    }

    // Update the payment status and notify accordingly
    await HelperCommands.updatePaymentStatusAndNotify(Number(order_id), status_to_update, msg);

    return msg.reply('Payment status updated and notified successfully! ✅');
  },
};

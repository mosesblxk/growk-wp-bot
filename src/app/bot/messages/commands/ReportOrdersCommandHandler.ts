import { Message } from 'whatsapp-web.js';
import { queryOrder } from '../../../usecases/query-orders';
import { HelperCommands } from '../../utils/HelperCommands';
import HelperCurrency from '../../utils/HelperCurrency';

export const ReportOrdersCommandHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    if (!HelperCommands.checkIfIsAdmin(msg.from)) {
      return msg.reply('Sorry! You do not have permission to use this command. ❌');
    }

    const report = `*REPORT* 
    \nNumber of orders 📋: *${await queryOrder.selectTotalOrders()}*
      In production ⌛️: *${await queryOrder.selectAndCountByStatus('producao')}*
      Completed ✅: *${await queryOrder.selectAndCountByStatus('finalizado')}*
      Delivery 🚚: *${await queryOrder.selectAndCountByStatus('entrega')}*
      Pickup 🛎: *${await queryOrder.selectAndCountByStatus('retirada')}*
      Awaiting payment 📲: *${await queryOrder.selectByPaymentStatus('pendente')}*
    \nTotal *R$* orders:
      Sold 📈: *${HelperCurrency.priceToString(await queryOrder.selectTotalSumOrders())}*
      Received ✅: *${HelperCurrency.priceToString(
        await queryOrder.selectByPaymentStatusAndSum('pago'),
      )}*
      Outstanding ❗️: *${HelperCurrency.priceToString(
        await queryOrder.selectByPaymentStatusAndSum('pendente'),
      )}*
    `;

    return msg.reply(report);
  },
};

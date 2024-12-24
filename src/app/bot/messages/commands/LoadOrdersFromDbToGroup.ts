import { Message } from 'whatsapp-web.js';
import { queryOrder } from '../../../usecases/query-orders';
import { IOrder, Item } from '../../interfaces/Order';
import { HelperCommands } from '../../utils/HelperCommands';
import HelperCurrency from '../../utils/HelperCurrency';
import dotenv from 'dotenv';
import moment from 'moment';
import { client } from '../../../../services/whatsapp';

dotenv.config();

export const LoadOrdersFromDbToGroup = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    // Check if the user is an admin
    if (!HelperCommands.checkIfIsAdmin(msg.from)) {
      return msg.reply('Sorry! You do not have permission to use this command. ❌');
    }

    const chatIdGroup = process.env.GROUP_CHAT_ID || '';
    const group_chat = await client.getChatById(chatIdGroup);
    if (!group_chat.isGroup) {
      return msg.reply('Group is not defined in the settings. ❌');
    }

    // Clear existing messages in the group
    await group_chat.clearMessages();

    const result = await queryOrder.selectAllOrdersRecords();
    result.map(async (item: IOrder) => {
      // Parse location and items from the order
      // @ts-ignore
      const location = JSON.parse(item.location);
      // @ts-ignore
      const car_items = JSON.parse(item.items);

      // Prepare the items to print
      const items_to_print = car_items.map((item: Item) => {
        return `
          •${item.name}:
          →Quantity: ${item.quantity}
          →Price: *${HelperCurrency.priceToString(Number(item.price))}*`;
      });

      // Function to format delivery data
      const delivery_data = () => {
        if (item.delivery_method === 'entrega') {
          return `
          *Delivery Information:*
          •Delivery Method: ${item.delivery_method}
          •Delivery Neighborhood: ${location.bairro}
          •Latitude: ${location.latitude}
          •Longitude: ${location.longitude}
          •Delivery Fee: ${location.taxa_entrega}`;
        }
        return undefined;
      };

      // Construct the order message
      const message = `*ORDER DETAILS*
        \n*ID*: ${item.id}
        \n*Order Number*: ${item.identifier}
        \n*Customer:*
        •Name: ${item.name}
        •Contact Number: ${item.contact_number}
        \n*Cart:*${items_to_print}
        ${delivery_data() ?? ''}
        \n*Payment Information:*
        •Payment Method: ${item.payment_method}
        •Payment Status: ${item.payment_status}
        \n*Order Status:* ${item.status}
        \nTotal Purchase: *${HelperCurrency.priceToString(Number(item.total))}*
        \n*Created On:* ${item.created_at}
        \n*Last Updated:* ${item.updated_at}`;

      // Send the order message to the group
      await group_chat.sendMessage(message);
    });

    // Add the timestamp when orders are loaded
    const now = moment().format('DD-MM-YYYY-hh:mm:ss');
    await group_chat.sendMessage(`Loaded at: ${now}`);

    return msg.reply('Orders loaded successfully ✅. Check the defined group.');
  },
};

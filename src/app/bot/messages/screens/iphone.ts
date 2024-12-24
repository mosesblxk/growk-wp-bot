import { Message } from 'whatsapp-web.js';

export const iPhoneCatalogHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    const iphoneCatalog = [
      { model: '6G', qty: 14, price: 88 + 10 },
      { model: '6S', qty: 8, price: 94 },
      { model: '6PLUS', qty: 18, price: 100 + 10 },
      { model: '6sPLUS', qty: 9, price: 100 + 10 },
      { model: '7PLUS', qty: 15, price: 100 + 10 },
    ];

    let catalogMessage = '*iPhone Catalog:*\n\n';
    iphoneCatalog.forEach((item) => {
      catalogMessage += `Model: ${item.model}\nStock: ${item.qty}\nPrice: GHS ${item.price}\n\n`;
    });

    return chat.sendMessage(catalogMessage);
  },
};

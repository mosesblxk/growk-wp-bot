import { Message } from 'whatsapp-web.js';

export const SamsungCatalogHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    const samsungCatalog = [
      { model: 'A02s', qty: 8, price: 94 + 10 },
      { model: 'A03core', qty: 16, price: 103 + 10 },
      { model: 'A10s', qty: 10, price: 92 + 10 },
      { model: 'A11', qty: 10, price: 112 + 10 },
      { model: 'A12', qty: 5, price: 94 + 10 },
      { model: 'A13', qty: 15, price: 102 + 10 },
      { model: 'A14 5G', qty: 9, price: 126 + 10 },
    ];

    let catalogMessage = '*Samsung Catalog:*\n\n';
    samsungCatalog.forEach((item) => {
      catalogMessage += `Model: ${item.model}\nStock: ${item.qty}\nPrice: GHS ${item.price}\n\n`;
    });

    return chat.sendMessage(catalogMessage);
  },
};

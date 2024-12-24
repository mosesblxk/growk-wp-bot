import { Message } from 'whatsapp-web.js';

const TecnoCatalog = [
  { model: '650', qty: 9, price: 96 + 10 },
  { model: '653', qty: 9, price: 89 + 10 },
  { model: '689', qty: 9, price: 114 + 10 },
  { model: 'CD7', qty: 7, price: 96 + 10 },
  { model: '680', qty: 9, price: 113 + 10 },
  { model: 'A58', qty: 19, price: 96 + 10 },
  { model: '6525', qty: 8, price: 96 + 10 },
  { model: '688', qty: 9, price: 114 + 10 },
  { model: 'BF7', qty: 10, price: 98 + 10 },
  { model: '690', qty: 10, price: 117 + 10 },
  { model: '657', qty: 3, price: 94 + 10 },
  { model: '612', qty: 10, price: 100 + 10 },
  { model: 'KF6', qty: 17, price: 94 + 10 },
];

const InfinixCatalog = [
  { model: 'A02s', qty: 8, price: 94 + 10 },
  { model: 'A03core', qty: 16, price: 103 + 10 },
  { model: 'A10s', qty: 10, price: 92 + 10 },
  { model: 'A11', qty: 10, price: 112 + 10 },
  { model: 'A12', qty: 5, price: 94 + 10 },
  { model: 'A13', qty: 15, price: 102 + 10 },
  { model: 'A14 5G', qty: 9, price: 126 + 10 },
];

const ItelCatalog = [
  { model: '650', qty: 9, price: 96 + 10 },
  { model: '653', qty: 9, price: 89 + 10 },
  { model: '689', qty: 9, price: 114 + 10 },
  { model: 'CD7', qty: 7, price: 96 + 10 },
  { model: '680', qty: 9, price: 113 + 10 },
  { model: 'A58', qty: 19, price: 96 + 10 },
  { model: '6525', qty: 8, price: 96 + 10 },
  { model: '688', qty: 9, price: 114 + 10 },
  { model: 'BF7', qty: 10, price: 98 + 10 },
  { model: '690', qty: 10, price: 117 + 10 },
  { model: '657', qty: 3, price: 94 + 10 },
  { model: '612', qty: 10, price: 100 + 10 },
  { model: 'KF6', qty: 17, price: 94 + 10 },
];

const TecnoCatalogHandler = {
  async execute(msg: Message): Promise<Message> {
    let catalog = '*Tecno Catalog:*\n\n';
    TecnoCatalog.forEach((item) => {
      catalog += `*Model:* ${item.model}\n*Stock:* ${item.qty}\n*Price:* GHS ${item.price}\n\n`;
    });
    return msg.reply(catalog);
  },
};

const InfinixCatalogHandler = {
  async execute(msg: Message): Promise<Message> {
    let catalog = '*Infinix Catalog:*\n\n';
    InfinixCatalog.forEach((item) => {
      catalog += `*Model:* ${item.model}\n*Stock:* ${item.qty}\n*Price:* GHS ${item.price}\n\n`;
    });
    return msg.reply(catalog);
  },
};

const ItelCatalogHandler = {
  async execute(msg: Message): Promise<Message> {
    let catalog = '*Itel Catalog:*\n\n';
    ItelCatalog.forEach((item) => {
      catalog += `*Model:* ${item.model}\n*Stock:* ${item.qty}\n*Price:* GHS ${item.price}\n\n`;
    });
    return msg.reply(catalog);
  },
};

export { InfinixCatalogHandler, ItelCatalogHandler, TecnoCatalogHandler };

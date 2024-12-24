import type { Message } from 'whatsapp-web.js';

export const DoubtCommandHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    return msg.reply(`Who are we?
      👉 [answer]
      \nWhere is the service location?
      👉 [answer]
      \nHow do I buy the products?
      👉 You can choose the items you want from our catalog and send us a completed cart. To see how to do this, type *#car*
      \nHow are the products made?
      👉 [answer]
      \nWhat can I do here on WhatsApp?
      👉 Generate an order and make a purchase automatically: *#car*
      👉 Talk to one of our attendants: *#help*
      👉 Learn more about our bot: *#bot*
      \nAfter making a purchase, how can I manage my order?
      👉 To view your order: *#view*
      👉 To cancel your order: *#cancel*
      \nFollow us on social media so you don't miss any updates:
      👉Instagram - [Instagram link]
      👉Facebook - [Facebook link]
      👉Whatsapp - [contact link]
      `);
  },
};

import type { Message } from 'whatsapp-web.js';

export const AboutBotCommandHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    return msg.reply(`Hello ✌️, my name is *Bubble* and I am an *automated ordering bot* through WhatsApp. I was created by *Growk AI* to add value to the company *Truscren*.
    \nIf you want to know more about me and the person who developed me, visit:
    👉 Website: https://www.growk.co/
    👉 Email: contact@growk.co
    \n\n *@Copyright All rights reserved - Growk - 2024*`);
  },
};

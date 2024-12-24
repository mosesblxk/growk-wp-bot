import { Message } from 'whatsapp-web.js';

export const CancelOrderCommandHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    return msg.reply(
      'Oops! This is still under development. Please try again later. Thank you :).',
    );
  },
};

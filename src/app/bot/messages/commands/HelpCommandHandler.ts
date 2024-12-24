import { Message } from 'whatsapp-web.js';
import { client } from '../../../../services/whatsapp';
import { redisClient } from '../../../../services/redis';

export const HelpCommandHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();
    const contact = await msg.getContact();

    chat.sendMessage(`Oh, that's too bad :(. Didn't find what you needed by typing *#duvidas*? Don't worry, we'll improve that.
    \n\nPlease wait a moment until one of our agents responds to solve your issue.`);

    const message_to_reply = `HEY. [company name] needs an agent on Whatsapp Business. Are you going to leave them waiting?
    \nName of the person who requested: *${contact.pushname}*
    \nNumber: ${await contact.getFormattedNumber()}
    \nWith the message: ${msg.body}`;

    const atendimento_object = {
      atendido: msg.from,
      atendente: '555555555555@c.us',
    };

    redisClient.set('atendimento:' + msg.from, 'true', { EX: 600 });
    redisClient.set('atendimento:555555555555@c.us', 'true');
    redisClient.set(
      'atendimento:555555555555@c.us:' + contact.pushname.toLowerCase(),
      JSON.stringify(atendimento_object),
    );

    return await client.sendMessage('555555555555@c.us', message_to_reply);
  },
};

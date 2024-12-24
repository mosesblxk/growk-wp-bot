import { Message, MessageMedia } from 'whatsapp-web.js';

export const CarTutorialCommandHandler = {
  async execute(msg: Message): Promise<Message> {
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    const media = MessageMedia.fromFilePath(
      'src/app/bot/messages/commands/video4985596413699162693.mp4',
    );

    chat.sendMessage(
      `That's awesome 😁. We appreciate your interest in making a purchase with us. We've prepared a mini tutorial, which will be sent in a few moments, showing you how to make a purchase here through WhatsApp.`,
    );

    return chat.sendMessage(media);
  },
};

import { Message } from 'whatsapp-web.js';
import { messageDispatcher } from './utils/MessageDispatcher';
// import { OrderMessageHandler } from './messages/OrderMessageHandler';
// import { AnyMessageHandler } from './messages/AnyMessageHandler';
// import { ConfirmDataStatusHandler } from './messages/ConfirmDataStatusHandler';
// import { OrderAddressHandler } from './messages/OrderAddressHandler';
// import { OrderDeliveryDataHandler } from './messages/OrderDeliveryDataHandler';
// import { OrderPaymentHandler } from './messages/OrderPaymentHandler';
// import { OrderProductionStatusHandler } from './messages/OrderProductionStatusHandler';
// import { CreatedOrderStatusHandler } from './messages/CreatedOrderStatusHandler';
// import { OrderTaxaDeliveryHandler } from './messages/OrderTaxaDeliveryHandler';
// import { OrderPaymentRequired } from './messages/OrderPaymentRequired';
// import { OrderFinishedStatusHandler } from './messages/OrderFinishedStatusHandler';
// import { DeliveryOrderStatusHandler } from './messages/DeliveryOrderStatusHandler';
// import { RetiradaOrderStatusHandler } from './messages/RetiradaOrderStatusHandler';

// import { FinishOrderCommandHandler } from './messages/commands/FinishOrderCommandHandler';
// import { DoubtCommandHandler } from './messages/commands/DoubtCommandHandler';
// import { AboutBotCommandHandler } from './messages/commands/AboutBotCommandHandler';
// import { CarTutorialCommandHandler } from './messages/commands/CarTutorialCommandHandler';
// import { InfoOrderCommandHandler } from './messages/commands/InfoOrderCommandHandler';
// import { CancelOrderCommandHandler } from './messages/commands/CancelOrderCommandHandler';
// import { HelpCommandHandler } from './messages/commands/HelpCommandHandler';
// import { DoneAtendimentoHandler } from './messages/commands/DoneAtendimentoHandler';
// import { UpdateOrderStatusCommand } from './messages/commands/UpdateOrderStatusCommand';
// import { ReportOrdersCommandHandler } from './messages/commands/ReportOrdersCommandHandler';
// import { LoadOrdersFromDbToGroup } from './messages/commands/LoadOrdersFromDbToGroup';
// import { UpdatePaymentStatusCommand } from './messages/commands/UpdatePaymentStatusCommand';
// import { CreatePaymentPixCommand } from './messages/commands/CreatePaymentPixCommand';
import { iPhoneCatalogHandler } from './messages/screens/iphone';
import { SamsungCatalogHandler } from './messages/screens/samsung';
import {
  InfinixCatalogHandler,
  ItelCatalogHandler,
  TecnoCatalogHandler,
} from './messages/screens/AndroidOthers';

let isHandlersRegistered = false;

export const MessageHandler = async (message: Message): Promise<void> => {
  console.log(message);
  let dispatchName = '';

  // Only register handlers once during bot initialization
  if (!isHandlersRegistered) {
    await messageDispatcher.register('iphone', iPhoneCatalogHandler);
    await messageDispatcher.register('samsung', SamsungCatalogHandler);
    await messageDispatcher.register('tecno', TecnoCatalogHandler);
    await messageDispatcher.register('infinix', InfinixCatalogHandler);
    await messageDispatcher.register('itel', ItelCatalogHandler);
    isHandlersRegistered = true;
  }

  // Handle the message and set dispatchName based on content
  if (!message.fromMe) {
    if (message.body.toLowerCase().includes('iphone')) {
      dispatchName = 'iphone';
    } else if (message.body.toLowerCase().includes('samsung')) {
      dispatchName = 'samsung';
    } else if (message.body.toLowerCase().includes('tecno')) {
      dispatchName = 'tecno';
    } else if (message.body.toLowerCase().includes('infinix')) {
      dispatchName = 'infinix';
    } else if (message.body.toLowerCase().includes('itel')) {
      dispatchName = 'itel';
    } else {
      // Default fallback for commands like #help, #orders, etc.
      dispatchName = message.body.startsWith('#') ? message.body.slice(1) : message.type;
    }
  }

  // Dispatch the message to the correct handler
  return messageDispatcher.dispatch(dispatchName, message);
};

// export const MessageHandler = async (message: Message): Promise<void> => {
//   console.log(message);

//   // Register handlers only once during bot initialization
//   if (!isHandlersRegistered) {
//     await messageDispatcher.register('ok', FinishOrderCommandHandler);
//     await messageDispatcher.register('about', DoubtCommandHandler);
//     await messageDispatcher.register('bot', AboutBotCommandHandler);
//     await messageDispatcher.register('car', CarTutorialCommandHandler);
//     await messageDispatcher.register('view', InfoOrderCommandHandler);
//     await messageDispatcher.register('cancel', CancelOrderCommandHandler);
//     await messageDispatcher.register('help', HelpCommandHandler);
//     await messageDispatcher.register('end', DoneAtendimentoHandler);
//     await messageDispatcher.register('update', UpdateOrderStatusCommand);
//     await messageDispatcher.register('orders', ReportOrdersCommandHandler);
//     await messageDispatcher.register('show', LoadOrdersFromDbToGroup);
//     await messageDispatcher.register('pay', UpdatePaymentStatusCommand);
//     await messageDispatcher.register('pix', CreatePaymentPixCommand);

//     await messageDispatcher.register('iphone', iPhoneCatalogHandler);
//     await messageDispatcher.register('samsung', SamsungCatalogHandler);

//     // Handlers for message types and order statuses
//     await messageDispatcher.register('order', OrderMessageHandler);
//     await messageDispatcher.register('chat', AnyMessageHandler);
//     await messageDispatcher.register('created', CreatedOrderStatusHandler);
//     await messageDispatcher.register('confirm-data', ConfirmDataStatusHandler);
//     await messageDispatcher.register('address-data', OrderAddressHandler);
//     await messageDispatcher.register('delivery-fee', OrderTaxaDeliveryHandler);
//     await messageDispatcher.register('delivery-data', OrderDeliveryDataHandler);
//     await messageDispatcher.register('payment-data', OrderPaymentHandler);
//     await messageDispatcher.register('pending-pix', OrderPaymentRequired);
//     await messageDispatcher.register('production', OrderProductionStatusHandler);
//     await messageDispatcher.register('delivery', DeliveryOrderStatusHandler);
//     await messageDispatcher.register('pickup', RetiradaOrderStatusHandler);
//     await messageDispatcher.register('finished', OrderFinishedStatusHandler);

//     isHandlersRegistered = true; // Set flag to avoid re-registering handlers
//   }

//   let dispatchName = '';

//   if (!message.fromMe) {
//     const isOrder = message.type == 'order';

//     if ((await OrderMessageHandler.CheckExistsOrderToUser(message)) && !isOrder) {
//       const order_status = await OrderMessageHandler.getStatusOrder(message);

//       // Determine dispatch name based on the order status or the message body
//       dispatchName = !message.body.startsWith('#') ? order_status : message.body.slice(1);
//     } else {
//       dispatchName = !message.body.startsWith('#') ? message.type : message.body.slice(1);
//     }
//   }

//   return messageDispatcher.dispatch(dispatchName, message);
// };

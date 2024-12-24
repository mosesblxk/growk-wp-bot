const greeting_messages = [
  'hello',
  'hi',
  'hey',
  'good morning',
  'good afternoon',
  'good evening',
  'howdy',
];

const greeting_message_to_reply = `Hi there! It's a pleasure to have you here. Welcome to the ⭐ *[company name]* ⭐ customer service and shopping channel.
  \nOur bots work *24 hours a day* and *7 days a week* to provide the best service to our customers.
  \nThe *purchase process* is fully automated via WhatsApp, just *access our catalog here* [catalog link] -> send a *cart with the products* you want to buy, and we’ll take care of the rest for you ;).
  \nTo learn how to send a cart and make a purchase in our store, type: *#car*
  \nYou can also type *#help* to learn more.`;

const created_status_message = `Great! You've already created an order by sending us a cart.
\nTo proceed, just type *#ok* or send us a *new cart* and we’ll take care of the rest for you ;).
\n\nYou can also type *#help* to learn more.`;

const confirm_data_status = `Oops, I checked here and you haven’t confirmed your order details yet.
\nTo do that, type: *yes* (to proceed with the order) or *no* (to update the cart).
\n\nYou can also type *#help* to learn more.`;

const confirm_address_data = `Let’s go! You’re almost done with your order. Please choose the method you want for receiving your purchase.
\nJust type *Delivery* or *Pickup*.
\n\nYou can also type *#help* to learn more.`;

const confirm_bairro_data = `You’re almost there to finish your order.
\nType a number from *1 to 5* that corresponds to your neighborhood!
\n\nYou can also type *#help* to learn more.`;

const confirm_delivery_data = `Let’s go! You’re almost done with your order. I found the delivery method you selected.
\nPlease send me your *location* details to receive your order at the comfort of your home.
\n\nYou can also type *#help* to learn more.`;

const confirm_payment_data = `You're at the last step to complete your order.
\nPlease send us your preferred payment method: *Card*, *Cash*, or *Pix*.`;

const production_status_message = `Awesome 🥳🥳! I checked and saw that you have an order being carefully prepared by our production team. 🧰
\nYou will be *notified* when it’s ready for delivery or pickup.
\nTo view your order, type: *#view*
\nTo create a new order, send us another cart (you can do this as many times as you want!): *#car*
\n\nYou can also type *#help* to learn more.`;

const entrega_status_message = `Awesome 🥳🥳! I checked and saw that your order is on its way to your location. We’ll notify you of any updates!
\n\nYou can also type *#help* to learn more.`;

const retirada_status_message = `Awesome 🥳🥳! I checked and saw that you have an order ready for pickup. We’re waiting for you.
\nTo know more about your order, type: *#view*
\n\nYou can also type *#help* to learn more.`;

const payment_required_message = `Let’s go! You’re almost there to get your products. Please make the payment to begin processing your order.
\n\nYou can also type *#help* to learn more.`;

const production_message = `Yay!! Your order has been sent for production, you will be notified when it’s ready for delivery or pickup.
\n\nThank you so much for your preference. ❤️
\nFollow us on social media so you don’t miss any news:
👉Instagram - [Instagram link]
👉Facebook - [Facebook link]
👉WhatsApp - [Contact link]
\nShare with others!`;

const finished_order_message = `We’re so happy with your purchase in our store. Thank you for using our services, we work hard to make your experience with us the best!
\nNow you can make a new order: *#car*
\nAnd view your completed order: *#view*

\n\nYou can also type *#help* to learn more.`;

const last_option_message = `Oops, I didn’t quite understand that :/ 
\nBut no worries!
\n\nYou can type *#help* to learn more about us.`;

export {
  greeting_messages,
  greeting_message_to_reply,
  production_status_message,
  last_option_message,
  created_status_message,
  confirm_data_status,
  confirm_address_data,
  confirm_delivery_data,
  confirm_payment_data,
  confirm_bairro_data,
  production_message,
  payment_required_message,
  finished_order_message,
  entrega_status_message,
  retirada_status_message,
};

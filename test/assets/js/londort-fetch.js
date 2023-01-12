"use strict"
const sendBtn = document.querySelector('#invia-ordine'),
	  url1 = 'londort-send.php',
	//   url2 = 'https://api.whatsapp.com/send?phone=393755572777',
	  lmcartItems = document.body.querySelector('.lmcart-items'),
	  lmcartItem = document.body.querySelector('.lmcart-item');

console.log(sessionStorage)
// if(!lmcartItem){
// 	console.log('nothing to send');
// 	sendBtn.hidden = true;
// } else {
// 	console.log('something to send');
// 	sendBtn.hidden = false;
// };

sendBtn.addEventListener('click', async function(e){
	e.preventDefault();
	console.log('"Ordina" is clicked')

	// Array to cycle...

	const sendArr = [],
		  cartItems = document.body.querySelectorAll('.lmcart-item'),
		  total = {
			"Totale": document.querySelector('.lmcart-total').innerText
		  };
	
	console.log(cartItems);

	for (let el of cartItems) {
		el = {
			"piatto": el.dataset.title,
			"quantita": el.querySelector('.lmcart-item-amount').innerText,
			"prezzo": el.dataset.price
		};
		sendArr.push(el);
	};
	sendArr.push(total);
	console.log(sendArr);

	// End of Array to cycle

	let response = await fetch(url1, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		  },
		body: JSON.stringify(sendArr)
	});
	let result = await response.text();
	// location.reload();
	// sessionStorage.clear();
	
});
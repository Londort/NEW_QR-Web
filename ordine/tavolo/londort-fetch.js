"use strict"
const sendBtn = document.querySelector('#invia-ordine'),
	  url1 = './londort-send.php',
	  url2 = '../tavolo/londort-email-send.php',	  
	  orderList = document.querySelector('#riepilogo-ordine'),
	  cartItems = orderList.children;

let sessionData = sessionStorage,
	filteredData = {},
	sendArr = [],
	total = {
		"Totale": document.querySelector('.lmcart-total').innerText
	};

console.group('sessionStorage cycle elements');

for(let item in sessionStorage){
	if( item.indexOf('comanda_') !== -1 ) {
		let dish = filteredData[item] = JSON.parse(sessionData.getItem(item));
		console.dir(dish.title);
		let dishInfo = {
			'Portata': dish.portata,
			'Piatto': dish.title,
			'Quantita': dish.qty,
			'Prezzo': dish.price
		}
		console.log(dishInfo);
		sendArr.push(dishInfo);
		sendArr.push(total);
	}
};

// console.dir(filteredData);
console.log(filteredData);
console.groupEnd();

console.group('populate sendArr')


console.groupEnd



sendBtn.addEventListener('click', async function(e){
	e.preventDefault();

	console.log('"Ordina" is clicked');	
	console.log(sendArr);
	
	fetch(url1, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		  },
		body: JSON.stringify(sendArr)
	})
	.then(response => response.text())
	.then(result => console.log(result))
	.catch((e) => console.error(e));
	// location.reload();
	// sessionStorage.clear();
	
});
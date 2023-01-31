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
		"Totale": null
	};

console.group('sessionStorage cycle elements');

for(let item in sessionStorage){
	if( item.indexOf('comanda_') !== -1 ) {
		let dish = filteredData[item] = JSON.parse(sessionData.getItem(item));

		let dishInfo = {
			"Portata": dish.portata,
			"Piatto": dish.title,
			"Quantita": dish.qty,
			"Prezzo": dish.price,
			"Subtotale": null,
			_summ () {
				this.Subtotale = (parseFloat(this.Prezzo)*this.Quantita).toFixed(2);
			}
		}
		dishInfo._summ();
		sendArr.push(dishInfo);
		
	}
};

for(let item of sendArr){
	console.dir(item.Subtotale);
	total.Totale += parseFloat(item.Subtotale);
	
};
console.log(total);
total.Totale.toFixed(2);

sendArr.push(total);
console.dir(sendArr);

// console.log(filteredData);
console.groupEnd();

console.group('Total price value search');
	const totalSumm = document.querySelector('h1.notranslate');
	console.dir(totalSumm);
	console.dir(totalSumm.innerText);
console.groupEnd();

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
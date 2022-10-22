// Generic method to fetch data from URL

async function getData(url) {
	let response = {}
	try {
		let res = await fetch(url)
		response = await res.json()
	} catch (err) {
		throw 'Error fetching data'
	}
	return response
}

/*
    === Object structures ===

    ds {
        getPrice: function() {
            0: PriceObj0,
            1: PriceObj1,
            ...
        }
    }

    PriceObj { 
        mid: function () { ... },
        quote: function () { ... },
        ... // other price data
    },
*/

const ds = {
	getPrices: function () {
		return new Promise(function (resolve, reject) {
			try {
				let result = getData('https://static.ngnrs.io/test/prices')
					.then((res) => {
						// Get prices object from fetched data
						return res.data.prices
					})
					.then((prices) => {
						// For each price object,
						prices.forEach((price) => {
							// Create mid() method
							price.mid = function () {
								let midVal = (this.buy + this.sell) / 2
								return midVal / 100 // Convert from cents to dollars
							}

							// Create quote() method
							price.quote = function () {
								const pair = this.pair
								return pair.substring(pair.length - 3) // get last 3 characters in pair string
							}
						})
						return prices
					})

				resolve(result)
			} catch (err) {
				reject(err)
			}
		})
	}
}

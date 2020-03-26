require('./styles/index.scss')

document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const currencyCode = urlParams.get('currencyCode');
	const walletAddress = urlParams.get('walletAddress');
	moonpayIFrame = document.getElementById('moonpayWidget');
	// TODO: Replace apiKey here when we get api key.
	// Can also replace color if we want
	var currentSrc = 'https://buy-staging.moonpay.io?apiKey=pk_test_3aM6rCKM7VxglAXwpo6xEm031iQWBbZq&colorCode=%23163150'
	
	if (currencyCode && walletAddress) {
		currentSrc += '&currencyCode=' + currencyCode + '&walletAddress=' + walletAddress
	}

	moonpayIFrame.src = currentSrc
})

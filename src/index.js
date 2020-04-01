require('./styles/index.scss')

document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const currencyCode = urlParams.get('currencyCode');
	const walletAddress = urlParams.get('walletAddress');
	const signature = urlParams.get('signature');
	moonpayIFrame = document.getElementById('moonpayWidget');
	// Can also replace color if we want
	var currentSrc = 'https://buy.moonpay.io?apiKey=pk_live_Fi1kufUL8EflbE49vbZRKa71S2a4Y1D&colorCode=%23163150'
	const isETHAddress = (address) => {
		return /^(0(x|X)[a-fA-F0-9]{40})$/.test(address);
	}
	if (currencyCode && walletAddress && signature && isETHAddress(walletAddress)) {
		currentSrc += '&currencyCode=' + currencyCode + '&walletAddress=' + walletAddress + '&signature=' + encodeURIComponent(signature)
	}
	moonpayIFrame.src = currentSrc

})

const installBtn = document.getElementById('buttonInstall');

window.addEventListener('beforeInstallPrompt', (event) => {
	window.deferredPrompt = event;

	installBtn.classList.toggle('hidden', false);
});

installBtn.addEventListener('click', async () => {
	const promptEvent = window.deferredPrompt;

	if (!promptEvent) {
		return;
	}
	promptEvent.prompt();
	window.deferredPrompt = null;
	installBtn.classList.toggle('hidden', true);
});

window.addEventListener('appInstalled', (event) => {
	window.deferredPrompt = null;
});

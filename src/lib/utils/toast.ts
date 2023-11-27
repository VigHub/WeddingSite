import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

export const handleToast = (ok: boolean, messageSuccess: string, messageError: string) => {
	if (ok) {
		sendToastSuccess(messageSuccess);
	} else {
		sendToastError(messageError);
	}
};

const sendToast = (message: string, success: boolean) => {
	const toastSettings: ToastSettings = {
		message: message,
		background: success ? 'variant-filled-success' : 'variant-filled-error',
		timeout: 3000
	};
	toastStore.trigger(toastSettings);
};

export const sendToastSuccess = (message: string) => sendToast(message, true);
export const sendToastError = (message: string) => sendToast(message, false);

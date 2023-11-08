<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { PUBLIC_HASH_RESERVED } from '$env/static/public';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	let password = '';
	const toastPasswordWrong: ToastSettings = {
		message: 'Password errata, non so se riesci ad indovinarla... 😏',
		background: 'variant-filled-error',
		timeout: 3000
	};

	function sha512(str: string) {
		return crypto.subtle.digest('SHA-512', new TextEncoder().encode(str)).then((buf) => {
			return Array.prototype.map
				.call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
				.join('');
		});
	}

	const onClick = async () => {
		const hashed = await sha512(password);
		if (hashed === PUBLIC_HASH_RESERVED) {
			goto(`${base}/guest-messages`);
		} else {
			toastStore.trigger(toastPasswordWrong);
			password = '';
		}
	};
</script>

<div class="container h-[600px] mx-auto my-auto flex justify-center items-center align-middle">
	<form class="w-full md:w-1/4 space-y-2">
		<label for="password" class="text-base"
			>Inserisci la password dell'area riservata: <br /> solo per gli sposi! 🤵🏻‍♂️👰🏻‍♀️</label
		>
		<input
			id="password"
			type="password"
			class="w-full p-2 block rounded-lg focus:ring-blue-500 focus:border-blue-500"
			bind:value={password}
		/>
		<button
			type="submit"
			class="btn variant-filled align-baseline float-right ms-4"
			on:click={onClick}>Invia</button
		>
	</form>
</div>

<script lang="ts">
	import { insertGuestMessage, type GuestMessage } from '$lib/db/db';
	import type { Guest } from '$lib/utils/searchGuests';
	import {
		RadioGroup,
		RadioItem,
		toastStore,
		type ToastSettings,
		modalStore,
		Accordion,
		AccordionItem
	} from '@skeletonlabs/skeleton';

	export let guest: Guest;
	let mail: string = '';
	let message: string = '';

	const toastOK: ToastSettings = {
		message: 'Messaggio inviato, grazie!',
		background: 'variant-filled-success',
		timeout: 3000
	};

	const toastError: ToastSettings = {
		message: "Qualcosa è andato storto nell'invio del messaggio",
		background: 'variant-filled-error',
		timeout: 3000
	};

	const onClick = async () => {
		const guestMessage: GuestMessage = {
			guest_id: guest.id,
			message,
			mail,
			confirmation: guest.confirmation
		};
		let toast = toastError;
		if (await insertGuestMessage(guestMessage)) {
			toast = toastOK;
		}
		modalStore.clear();
		toastStore.trigger(toast);
	};

	const getConfirmation = (confirmation: number) => {
		switch (confirmation) {
			case 0:
				return 'In attesa 🤔';
			case 1:
				return 'Ci sono 🥳';
			case 2:
				return 'Non ci sono 😣';
			default:
				return 'In attesa';
		}
	};
</script>

<div class="p-4 md:flex md:flex-col lg:w-1/2 w-full md:max-w-[500px] bg-white rounded-2xl">
	<Accordion>
		<p class="mb-4">{guest.name} {guest.surname}</p>
		<RadioGroup background="bg-white">
			{#each [0, 1, 2] as confirmation}
				<RadioItem
					bind:group={guest.confirmation}
					padding="py-2 px-2"
					name="justify"
					value={confirmation}>{getConfirmation(confirmation)}</RadioItem
				>
			{/each}
		</RadioGroup>
		<AccordionItem>
			<svelte:fragment slot="summary">Vuoi mandarci anche un messaggio?</svelte:fragment>
			<svelte:fragment slot="content"
				><div class="container h-full mx-auto flex justify-center items-center">
					<form class="w-full space-y-2">
						<input
							id="mail"
							class="w-full p-2 block rounded-lg focus:ring-blue-500 focus:border-blue-500"
							placeholder="mail@esempio.com"
							bind:value={mail}
						/>
						<textarea
							id="message"
							rows="4"
							class="block p-2.5 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500"
							placeholder="Scrivi qui il tuo messaggio"
							bind:value={message}
						/>
					</form>
				</div>
			</svelte:fragment>
		</AccordionItem>
		<button type="submit" class="btn variant-filled align-baseline float-right" on:click={onClick}
			>Invia</button
		>
	</Accordion>
</div>

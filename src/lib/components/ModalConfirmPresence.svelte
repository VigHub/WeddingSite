<script lang="ts">
	import {
		insertGuestMessage,
		type GuestMessage,
		type GuestAttendance,
		updateGuestAttendance
	} from '$lib/db/db';
	import { getAttendance } from '$lib/utils/guests';
	import {
		RadioGroup,
		RadioItem,
		toastStore,
		type ToastSettings,
		modalStore,
		Accordion,
		AccordionItem
	} from '@skeletonlabs/skeleton';

	export let guest: GuestAttendance;
	export let resetParameters: () => void;
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
		let toast = toastOK;
		const attendanceUpserted = await updateGuestAttendance(guest.guest.id, guest.attendance);
		if (!attendanceUpserted) {
			toast = toastError;
		} else if (message !== '') {
			const guestMessage: GuestMessage = {
				guest_id: guest.guest.id,
				message,
				attendance: guest.attendance
			};
			if (await !insertGuestMessage(guestMessage)) {
				toast = toastError;
			}
		}
		modalStore.clear();
		resetParameters();
		toastStore.trigger(toast);
	};
</script>

<div class="p-4 md:flex md:flex-col lg:w-1/2 w-full md:max-w-[500px] bg-white rounded-2xl">
	<Accordion>
		<p class="mb-4">{guest.guest.name} {guest.guest.surname}</p>
		<RadioGroup background="bg-white">
			{#each [0, 1, 2] as attendanceItem}
				<RadioItem
					bind:group={guest.attendance}
					padding="py-2 px-2"
					name="justify"
					value={attendanceItem}>{getAttendance(attendanceItem)}</RadioItem
				>
			{/each}
		</RadioGroup>
		<AccordionItem>
			<svelte:fragment slot="summary">Vuoi mandarci anche un messaggio?</svelte:fragment>
			<svelte:fragment slot="content"
				><div class="container h-full mx-auto flex justify-center items-center">
					<form class="w-full">
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

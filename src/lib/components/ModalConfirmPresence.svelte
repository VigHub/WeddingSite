<script lang="ts">
	import { base } from '$app/paths';
	import { fetchPost } from '$lib/utils/api';
	import { getAttendance } from '$lib/utils/guests';
	import type { GuestAttendance, GuestMessage } from '$lib/utils/interfaces';
	import {
		RadioGroup,
		RadioItem,
		toastStore,
		type ToastSettings,
		modalStore,
		Stepper,
		Step
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

	const sendAttendanceAndMessage = async () => {
		let toast = toastOK;
		let res = await fetchPost('updateGuestAttendance', {
			id: guest.guest.id,
			attendance: guest.attendance
		});
		const attendanceUpserted = res.ok;
		if (!attendanceUpserted) {
			toast = toastError;
		} else if (message !== '') {
			const guestMessage: GuestMessage = {
				guest_id: guest.guest.id,
				message,
				attendance: guest.attendance
			};
			res = await fetchPost('insertGuestMessage', {
				guestMessage
			});
			const inserted = res.ok;
			if (!inserted) {
				toast = toastError;
			}
		}
		modalStore.clear();
		resetParameters();
		toastStore.trigger(toast);
	};
</script>

<div class="p-4 md:flex md:flex-col lg:w-1/2 w-full md:max-w-[500px] bg-white rounded-2xl">
	<Stepper
		buttonBackLabel="← Indietro"
		buttonNextLabel="Successivo →"
		buttonCompleteLabel="Invia"
		buttonComplete="variant-filled"
		on:complete={sendAttendanceAndMessage}
	>
		<Step>
			<svelte:fragment slot="header">Partecipazione</svelte:fragment>
			<p class="font-semibold">{guest.guest.name} {guest.guest.surname}</p>
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
		</Step>
		<Step>
			<svelte:fragment slot="header">Vuoi mandarci anche un messaggio?</svelte:fragment>
			<div class="container h-full mx-auto flex justify-center items-center">
				<form class="w-full">
					<textarea
						id="message1"
						rows="4"
						class="block p-2.5 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500"
						placeholder="Scrivi qui il tuo messaggio (opzionale)"
						bind:value={message}
					/>
				</form>
			</div>
		</Step>
		<Step>
			<svelte:fragment slot="header">Conferma</svelte:fragment>
			<div class="h-full">
				<div class="flex items-center">
					<p class="font-semibold w-full">
						{guest.guest.name}
						{guest.guest.surname}:
						<span class="font-medium ms-5">
							{getAttendance(guest.attendance)}
						</span>
					</p>
				</div>
				{#if message !== ''}
					<label class="font-semibold" for="message2">Messaggio:</label>
					<textarea
						id="message2"
						rows="4"
						class="block p-2.5 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500"
						placeholder="Scrivi qui il tuo messaggio (opzionale)"
						bind:value={message}
						disabled
					/>
				{/if}
			</div>
		</Step>
	</Stepper>
</div>

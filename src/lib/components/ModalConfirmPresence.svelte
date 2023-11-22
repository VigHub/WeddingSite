<script lang="ts">
	import { fetchPost } from '$lib/utils/api';
	import { getAttendance } from '$lib/utils/guests';
	import type { Guest, GuestMessage } from '$lib/utils/interfaces';
	import {
		toastStore,
		type ToastSettings,
		modalStore,
		Stepper,
		Step
	} from '@skeletonlabs/skeleton';
	import GuestConfirm from './GuestConfirm.svelte';

	export let guest: Guest;
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
	export let guestsGroup: Guest[] = [];
	let showGroup = false;
	const sendAttendance = async (gst: Guest) => {
		let res = await fetchPost('updateGuestAttendance', {
			id: gst.id,
			attendance: gst.attendance
		});
		return res.ok ?? false;
	};
	const close = (isOk: boolean) => {
		const toast = isOk ? toastOK : toastError;
		modalStore.clear();
		resetParameters();
		toastStore.trigger(toast);
	};

	const sendAttendanceAndMessage = async () => {
		let isOk = await sendAttendance(guest);
		if (!isOk) {
			close(false);
			return;
		}
		if (showGroup) {
			for (const gst of guestsGroup) {
				isOk = await sendAttendance(gst);
				if (!isOk) {
					close(false);
					return;
				}
			}
		}
		if (message !== '') {
			const guestMessage: GuestMessage = {
				guest_id: guest.id,
				message,
				attendance: guest.attendance
			};
			isOk = await fetchPost('insertGuestMessage', {
				guestMessage
			});
			if (!isOk) {
				close(false);
				return;
			}
		}
		close(true);
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
			<GuestConfirm
				{guest}
				isParent={true}
				onClick={() => {
					showGroup = !showGroup;
				}}
				isClickable={guestsGroup.length > 0}
			/>
			{#if showGroup}
				<div
					class="py-4 px-2 space-y-6 max-h-[300px]
					overflow-y-auto border-2 border-gray-300 rounded-l-xl"
				>
					{#each guestsGroup as guestGroup}
						<GuestConfirm guest={guestGroup} />
					{/each}
				</div>
			{/if}
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
				<div class="flex relative w-full">
					<p class="font-semibold w-3/5 truncate">
						{guest.name}
						{guest.surname}:
					</p>
					<p class="font-medium text-right absolute right-0">
						{getAttendance(guest.attendance)}
					</p>
				</div>
				{#if showGroup}
					{#each guestsGroup as guestGroup}
						<div class="flex relative w-full">
							<p class="font-semibold w-3/5 truncate">
								{guestGroup.name}
								{guestGroup.surname}:
							</p>
							<p class="font-medium text-right absolute right-0">
								{getAttendance(guestGroup.attendance)}
							</p>
						</div>
					{/each}
				{/if}
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

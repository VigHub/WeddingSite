<script lang="ts">
	import type { Guest } from '$lib/utils/interfaces';
	import { ProgressRadial, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import { fetchPost } from '$lib/utils/api';
	export let onClickGuest: (guest: Guest) => Promise<void>;
	export let guests: Guest[] = [];
	let name = '';
	let surname = '';

	let loadingGuest = false;
	const toastGuestNotFound: ToastSettings = {
		message: 'Nessun invitato trovato con questo nome e/o cognome',
		background: 'variant-filled-error',
		timeout: 3000
	};

	const onSearch = async () => {
		loadingGuest = true;
		const res = await fetchPost('guestsByNameSurname', {
			name,
			surname
		});
		guests = res.guests;
		loadingGuest = false;
		if (guests.length == 0 && (name !== '' || surname !== '')) {
			toastStore.clear();
			toastStore.trigger(toastGuestNotFound);
		}
	};
</script>

<div class="w-full md:max-w-2xl max-w-5xl">
	<form class="">
		<div class="mb-4 mt-4 md:flex md:space-x-4 w-full">
			<div class="md:w-1/2">
				<!-- <label for="name" class="block text-gray-700 font-semibold">Nome:</label> -->
				<input
					type="text"
					id="name"
					class="w-full p-2 mt-5 border rounded-md"
					placeholder={$_('general.name')}
					bind:value={name}
				/>
			</div>
			<div class="md:w-1/2">
				<!-- <label for="surname" class="block text-gray-700 font-semibold">Cognome:</label> -->
				<input
					type="text"
					id="surname"
					class="w-full p-2 mt-5 border rounded-md"
					placeholder={$_('general.surname')}
					bind:value={surname}
				/>
			</div>
		</div>
		<div class="flex justify-center">
			<button type="submit" class="btn variant-filled" on:click={async () => await onSearch()}
				>{$_('general.search')}</button
			>
		</div>
	</form>

	<div class="mt-5">
		{#if loadingGuest}
			<ProgressRadial width={'w-12 md:w-20'} />
		{:else}
			<ul class="bg-white flex flex-col space-y-3">
				{#each guests ?? [] as guest}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li
						class="text-lg p-3 items-center w-full mx-auto text-center
		border rounded-md border-black relative hover:bg-gray-100 hover:text-gray-900
		hover:scale-110 transition duration-300 ease-in-out cursor-pointer
		"
						on:click={() => {
							onClickGuest(guest);
						}}
					>
						{guest.name}
						{guest.surname}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

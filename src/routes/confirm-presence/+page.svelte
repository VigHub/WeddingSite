<script lang="ts">
	import ModalConfirmPresence from '$lib/components/ModalConfirmPresence.svelte';
	import {
		modalStore,
		type ModalSettings,
		type ModalComponent,
		type ToastSettings,
		ProgressRadial
	} from '@skeletonlabs/skeleton';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { getGuestsbyNameSurname, type GuestAttendance } from '$lib/db/db';
	import canAccessReservedArea from '../../stores/reserved';

	canAccessReservedArea.set(false);

	let guests: GuestAttendance[] = [];
	let loadingGuest = false;
	let name = '';
	let surname = '';
	const toastGuestNotFound: ToastSettings = {
		message: 'Nessun invitato trovato con questo nome e/o cognome',
		background: 'variant-filled-error',
		timeout: 3000
	};

	const onClick = async () => {
		loadingGuest = true;
		guests = await getGuestsbyNameSurname(name, surname);
		loadingGuest = false;
		if (guests.length == 0 && (name !== '' || surname !== '')) {
			toastStore.clear();
			toastStore.trigger(toastGuestNotFound);
		}
	};

	const resetParameters = () => {
		name = '';
		surname = '';
		guests = [];
	};

	const openModal = (guest: GuestAttendance) => {
		const modalComponent: ModalComponent = {
			// Pass a reference to your custom component
			ref: ModalConfirmPresence,
			// Add the component properties as key/value pairs
			props: { guest, resetParameters },
			// Provide a template literal for the default component slot
			slot: '<p>Skeleton</p>'
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Returns the updated response value
			response: () => resetParameters()
		};

		modalStore.trigger(modal);
	};
</script>

<h1 class="text-center text-4xl">Ci accompagni o te lo perdi?</h1>

<div class="max-w-2xl gap-y-5 text-center">
	<p class="mt-5">
		Per confermare la vostra presenza alle nozze vi basterà scrivere il vostro nome e cliccare su
		Cerca. Una volta trovati, dovrete solo indicarci se verrete o no al matrimonio (se volete,
		potete lasciare un messaggio. È opzionale, ma ci farebbe tanto piacere leggerlo!). :)
	</p>
</div>
<form class="lg:w-1/2 w-full">
	<div class="mb-4 mt-4 md:flex md:space-x-4 w-full">
		<div class="md:w-1/2">
			<!-- <label for="name" class="block text-gray-700 font-semibold">Nome:</label> -->
			<input
				type="text"
				id="name"
				class="w-full p-2 mt-5 border rounded-md"
				placeholder="Nome"
				bind:value={name}
			/>
		</div>
		<div class="md:w-1/2">
			<!-- <label for="surname" class="block text-gray-700 font-semibold">Cognome:</label> -->
			<input
				type="text"
				id="surname"
				class="w-full p-2 mt-5 border rounded-md"
				placeholder="Cognome"
				bind:value={surname}
			/>
		</div>
	</div>
	<div class="flex justify-center">
		<button type="submit" class="btn variant-filled" on:click={onClick}>Cerca</button>
	</div>
</form>

<div class="mt-5">
	{#if loadingGuest}
		<ProgressRadial width={'w-12 md:w-20'} />
	{:else}
		<ul class="bg-white w-screen flex flex-col space-y-3">
			{#each guests ?? [] as guest}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li
					class="text-lg p-3 items-center md:w-1/3 sm:w-4/5 mx-auto text-center
				border rounded-md border-black relative hover:bg-gray-100 hover:text-gray-900
				hover:scale-110 transition duration-300 ease-in-out cursor-pointer
				"
					on:click={() => openModal(guest)}
				>
					{guest.guest.name}
					{guest.guest.surname}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<script lang="ts">
	import ModalConfirmPresence from '$lib/components/ModalConfirmPresence.svelte';
	import { searchGuest, type Guest } from '$lib/utils/searchGuests';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';

	let name = '';
	let surname = '';
	let guests: Guest[] = [];
	let showNoGuest = false;

	const onClick = () => {
		guests = searchGuest(name, surname);
		if (guests.length == 0 && (name !== '' || surname !== '')) {
			showNoGuest = true;
			setTimeout(() => {
				showNoGuest = false;
			}, 1000);
		}
	};

	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: ModalConfirmPresence,
		// Add the component properties as key/value pairs
		props: { name: 'name', surname: 'surname' },
		// Provide a template literal for the default component slot
		slot: '<p>Skeleton</p>'
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		// Returns the updated response value
		response: (r: string) => console.log('response:', r)
	};
	const openModal = () => {
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
<div class="mb-4 mt-4 md:flex md:space-x-4 lg:w-1/2 w-full">
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
<button type="button" class="btn variant-filled" on:click={onClick}>Cerca</button>

<div class="mt-5">
	<ul class="bg-white w-screen flex flex-col space-y-3">
		{#each guests as guest}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				class="text-lg p-3 items-center md:w-1/3 sm:w-4/5 mx-auto text-center border rounded-md border-black relative hover:bg-gray-100 hover:text-gray-900"
				on:click={openModal}
			>
				{guest.name}
				{guest.surname}
			</li>
		{/each}
		{#if showNoGuest}
			<li
				out:fade={{ duration: 500 }}
				class="text-lg p-3 items-center md:w-1/3 sm:w-4/5 mx-auto
				text-center border rounded-md border-black relative variant-ghost-error"
			>
				Nessun invitato trovato con questo <br />nome e/o cognome
			</li>
		{/if}
	</ul>
</div>

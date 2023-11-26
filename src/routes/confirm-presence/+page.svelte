<script lang="ts">
	import ModalConfirmPresence from '$lib/components/ModalConfirmPresence.svelte';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import canAccessReservedArea from '../../stores/reserved';
	import type { Guest } from '$lib/utils/interfaces';
	import { fetchPost } from '$lib/utils/api';
	import { _ } from 'svelte-i18n';
	import SearchGuests from '$lib/components/SearchGuests.svelte';

	canAccessReservedArea.set(false);

	let guests: Guest[] = [];

	const resetParameters = () => {
		guests = [];
	};

	const openModal = async (guest: Guest) => {
		const guestsGroup = await fetchPost('guestsSameGroup', {
			groupId: guest.groupId,
			guestId: guest.id
		});
		const modalComponent: ModalComponent = {
			// Pass a reference to your custom component
			ref: ModalConfirmPresence,
			// Add the component properties as key/value pairs
			props: { guest, resetParameters, guestsGroup: guestsGroup.guests },
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

	const onClickGuest = async (guest: Guest) => {
		await openModal(guest);
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
<SearchGuests {guests} {onClickGuest} />

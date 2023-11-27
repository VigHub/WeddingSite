<script lang="ts">
	import { fetchPost } from '$lib/utils/api';
	import type { GuestGroup } from '$lib/utils/interfaces';
	import { handleToast } from '$lib/utils/toast';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { groups } from '../../../stores/guestsGroupReserved';

	export let group: GuestGroup;
	export let onBack = () => {};

	const deleteGroup = async () => {
		const { ok } = await fetchPost('group/remove', {
			id: group.id
		});
		handleToast(ok, 'Gruppo cancellato', 'Gruppo non cancellato');
		$groups = $groups.filter((g) => g.id !== group.id);
		modalStore.clear();
	};
</script>

<div>
	<h2>Sei sicuro di voler cancellare il gruppo?</h2>

	<div class="flex justify-center mt-5 space-x-3">
		<button class="btn variant-ghost" on:click={onBack}>Annulla</button>
		<button class="btn variant-filled" on:click={deleteGroup}>Elimina gruppo</button>
	</div>
</div>

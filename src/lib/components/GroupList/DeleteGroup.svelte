<script lang="ts">
	import { fetchPost } from '$lib/utils/api';
	import type { GuestGroup } from '$lib/utils/interfaces';
	import { handleToast } from '$lib/utils/toast';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { groups } from '../../../stores/guestsGroupReserved';
	import { _ } from 'svelte-i18n';

	export let group: GuestGroup;
	export let onBack = () => {};

	const deleteGroup = async () => {
		const { ok } = await fetchPost('group/remove', {
			id: group.id
		});
		handleToast(
			ok,
			$_('pages.reserved-area.group.canceled'),
			$_('pages.reserved-area.group.notCanceled')
		);
		$groups = $groups.filter((g) => g.id !== group.id);
		modalStore.clear();
	};
</script>

<div>
	<h2>{$_('pages.reserved-area.group.delete')}</h2>

	<div class="flex justify-center mt-5 space-x-3">
		<button class="btn variant-ghost" on:click={onBack}>{$_('general.back')}</button>
		<button class="btn variant-filled" on:click={deleteGroup}>{$_('general.confirm')}</button>
	</div>
</div>

<script lang="ts">
	import { fetchPost } from '$lib/utils/api';
	import type { GuestGroup } from '$lib/utils/interfaces';
	import { handleToast } from '$lib/utils/toast';
	import { _ } from 'svelte-i18n';

	export let group: GuestGroup;
	export let afterUpdate: () => void = () => {};

	let oldGroupName: string = group.name;

	const updateGroupName = async () => {
		if (group.name === oldGroupName) return;
		const { ok } = await fetchPost('group/updateName', {
			id: group.id,
			name: group.name
		});
		handleToast(
			ok,
			$_('pages.reserved-area.group.updated'),
			$_('pages.reserved-area.group.notUpdated')
		);
		afterUpdate();
	};
</script>

<div class="w-full md:max-w-2xl max-w-5xl">
	<form class="relative min-h-[150px]">
		<div class="mb-4 mt-4 md:flex md:space-x-4 w-full">
			<div class="md:w-1/2">
				<p class="block text-gray-700 font-semibold">{$_('pages.reserved-area.group.newName')}</p>
				<input
					type="text"
					id="name"
					class="w-full p-2 mt-1 border rounded-md"
					placeholder={$_('pages.reserved-area.group.newName')}
					bind:value={group.name}
				/>
			</div>
		</div>
		<div class="absolute right-0 bottom-0">
			<button type="submit" class="btn variant-filled" on:click={updateGroupName}
				>{$_('general.update')}</button
			>
		</div>
	</form>
</div>

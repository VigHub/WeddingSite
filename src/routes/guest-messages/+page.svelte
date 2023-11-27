<script lang="ts">
	import canAccessReservedArea from '../../stores/reserved';
	import GuestMessagesList from '$lib/components/GuestMessage/GuestMessagesList.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import GuestsPresence from '$lib/components/GuestsPresence.svelte';
	import GroupsList from '$lib/components/GroupList/GroupsList.svelte';
	import { _ } from 'svelte-i18n';
	let tabSet = 0;
</script>

{#if !$canAccessReservedArea}
	<div class="h-[500px] flex items-center justify-center mx-auto">
		<div class="space-y-4">
			<h1 class="text-center text-3xl md:text-5xl md:pb-3">{$_('pages.reserved-area.denied')}</h1>
			<p class="text-xl text-center md:text-2xl">
				{$_('pages.reserved-area.deniedMessage')}
			</p>
			<p class="text-xl text-center md:text-2xl">🤵🏻‍♂️👰🏻‍♀️</p>
		</div>
	</div>
{:else}
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead">{$_('pages.reserved-area.allMessages')}</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>
			<svelte:fragment slot="lead">{$_('pages.reserved-area.attendance')}</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>
			<svelte:fragment slot="lead">{$_('pages.reserved-area.groups')}</svelte:fragment>
		</Tab>
		<svelte:fragment slot="panel">
			<div class="w-[300px] md:w-[500px]">
				{#if tabSet === 0}
					<GuestMessagesList />
				{:else if tabSet === 1}
					<GuestsPresence />
				{:else if tabSet === 2}
					<GroupsList />
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
{/if}

<script lang="ts">
	import canAccessReservedArea from '../../stores/reserved';
	import type { PageData } from './$types';
	import GuestMessagesList from '$lib/components/GuestMessagesList.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import GuestsPresence from '$lib/components/GuestsPresence.svelte';
	export let data: PageData;
	const messagesPerPage = 4;
	let tabSet = 0;
</script>

{#if !$canAccessReservedArea}
	<div class="h-[600px] flex items-center justify-center mx-auto">
		<div class="space-y-4">
			<h1 class="text-center text-3xl md:text-5xl md:pb-3">Accesso negato! ❌</h1>
			<p class="text-xl text-center md:text-2xl">
				Non hai accesso a questa schermata, è solo per gli sposi!
			</p>
			<p class="text-xl text-center md:text-2xl">🤵🏻‍♂️👰🏻‍♀️</p>
		</div>
	</div>
{:else}
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead">Tutti i messaggi</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value={1}>
			<svelte:fragment slot="lead">Presenze</svelte:fragment>
		</Tab>
		<svelte:fragment slot="panel">
			<div class="w-[300px] md:w-[500px]">
				{#if tabSet === 0}
					<GuestMessagesList
						data={data.data.guestMessages}
						size={data.size ?? 0}
						{messagesPerPage}
					/>
				{:else if tabSet === 1}
					<GuestsPresence guestsPromise={data.data.guests} />
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
{/if}

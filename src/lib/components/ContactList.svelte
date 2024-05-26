<script lang="ts">
	import type { Contact } from '$lib/utils/interfaces';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';

	export let contacts: Contact[] = [];
</script>

<div class="w-full flex">
	<ul class="list mx-auto">
		{#each contacts as contact}
			<li class="">
				<Avatar src="{base}/{contact.image}" width="w-12" />
				<div class="flex flex-1 justify-between">
					<div class="pe-5">
						<p class="text-base">{contact.name}{contact.description ? '' : ':'}</p>
						{#if contact.description}
							<p class="text-base">{contact.description}:</p>
						{/if}
					</div>
					<div class="block place-content-end">
						<p class="text-base align-bottom">{contact.number}</p>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

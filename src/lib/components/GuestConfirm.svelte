<script lang="ts">
	import { getAttendance } from '$lib/utils/guests';
	import type { Guest } from '$lib/utils/interfaces';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	export let guest: Guest;
	export let isParent = false;
	export let isClickable = true;
	export let onClick = () => {};
	let clicked = false;

	$: buttonClass = `btn w-fit font-light text-xs border rounded-xl py-1 px-2 hover:variant-ghost ${
		clicked ? 'variant-ghost' : 'bg-white'
	}`;
</script>

<div class="space-y-2">
	<div>
		<p class="font-semibold truncate">{guest.name} {guest.surname}</p>
		<div />
	</div>
	<RadioGroup background="bg-white">
		{#each [0, 1, 2] as attendance}
			<RadioItem bind:group={guest.attendance} padding="py-2 px-2" name="justify" value={attendance}
				>{$_(getAttendance(attendance))}</RadioItem
			>
		{/each}
	</RadioGroup>
	{#if isParent && isClickable}
		<div class="w-full flex justify-center">
			<button
				on:click={() => {
					clicked = !clicked;
					onClick();
				}}
				class={buttonClass}
			>
				{$_('pages.confirm-presence.set-others')}
			</button>
		</div>
	{/if}
</div>

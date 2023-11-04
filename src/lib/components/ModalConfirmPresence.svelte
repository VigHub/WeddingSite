<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	export let name: string;
	export let surname: string;

	let presence: number = 0;
	let mail: string = '';
</script>

<div class="p-4 md:flex md:flex-col lg:w-1/2 w-full bg-surface-200 rounded-2xl">
	<p class="mb-4">{name} {surname}</p>

	<RadioGroup>
		<RadioItem bind:group={presence} name="justify" value={0}>In attesa</RadioItem>
		<RadioItem bind:group={presence} name="justify" value={1}>Accetto</RadioItem>
		<RadioItem bind:group={presence} name="justify" value={2}>Non accetto</RadioItem>
	</RadioGroup>

	<div class="mt-4 grid space-y-2 relative">
		<label for="message" class="block">Il tuo messaggio (opzionale, solo se vuoi)</label>
		<input
			type="mail"
			id="mail"
			class="w-full p-2 block rounded-lg focus:ring-blue-500 focus:border-blue-500"
			placeholder="mail@esempio.com"
			bind:value={mail}
		/>
		<textarea
			id="message"
			rows="4"
			class="block p-2.5 w-full rounded-lg
         focus:ring-blue-500 focus:border-blue-500"
			placeholder="Scrivi qui il tuo messaggio"
		/>
		<button type="submit" class="btn w-1/6 variant-filled align-baseline">Invia</button>
	</div>
</div>

<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	export let name: string;
	export let surname: string;

	let presence: number = 0;
	let mail: string = '';
</script>

<div class="p-4 md:flex md:flex-col lg:w-1/2 w-full bg-white rounded-2xl">
	<p class="mb-4">{name} {surname}</p>

	<RadioGroup background="bg-white">
		<RadioItem bind:group={presence} name="justify" value={0}>In attesa</RadioItem>
		<RadioItem bind:group={presence} name="justify" value={1}>Ci sono</RadioItem>
		<RadioItem bind:group={presence} name="justify" value={2}>Non ci sono</RadioItem>
	</RadioGroup>

	<div class="container h-full mx-auto flex justify-center items-center">
		<form class="w-full space-y-2 mt-4">
			<label for="message" class="block">Il tuo messaggio (opzionale, solo se vuoi)</label>
			<input
				id="mail"
				class="w-full p-2 block rounded-lg focus:ring-blue-500 focus:border-blue-500"
				placeholder="mail@esempio.com"
				bind:value={mail}
			/>
			<textarea
				id="message"
				rows="4"
				class="block p-2.5 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500"
				placeholder="Scrivi qui il tuo messaggio"
			/>
			<button type="submit" class="btn variant-filled align-baseline float-right">Invia</button>
		</form>
	</div>
</div>

<script>
	import { clipboard } from '@skeletonlabs/skeleton';

	const iban = 'IT20P0310411100000000400142';
	let copied = false;
</script>

<div class="">
	<label for="iban" class="text-left">IBAN</label>
	<div class="flex items-center w-full">
		<div data-clipboard="ibanValue" class="p-2 border rounded-md text-sm w-4/5 text-left">
			{iban}
		</div>
		<button
			use:clipboard={{ element: 'ibanValue' }}
			class="ml-1 p-2 btn variant-filled rounded-md w-1/5 text-sm"
			on:click={() => {
				copied = true;
				setTimeout(() => (copied = false), 1500);
			}}
		>
			{copied ? 'Copiato!' : 'Copia'}
		</button>
	</div>
</div>

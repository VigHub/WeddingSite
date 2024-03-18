<script>
	import { clipboard } from '@skeletonlabs/skeleton';

	const iban = 'IT74G0301503200000003940092';
	let copied = false;
</script>

<div class="">
	<label for="iban" class="text-left">IBAN</label>
	<div class="flex items-center">
		<div
			data-clipboard="ibanValue"
			class="p-2 border rounded-md text-sm w-4/5 md:w-[300px] text-left"
		>
			{iban}
		</div>
		<button
			use:clipboard={{ element: 'ibanValue' }}
			class="ml-1 p-2 btn variant-filled rounded-md w-[80px] text-sm"
			on:click={() => {
				copied = true;
				setTimeout(() => (copied = false), 1500);
			}}
		>
			{copied ? 'Copiato!' : 'Copia'}
		</button>
	</div>
</div>

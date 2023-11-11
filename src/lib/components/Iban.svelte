<script>
	import { clipboard } from '@skeletonlabs/skeleton';

	const iban = 'IT20P0310411100000000400142';
	let copied = false;
</script>

<div class="relative m-2 hover:border hover:rounded-lg hover:shadow-lg pt-4">
	<div class="text-2xl font-semibold absolute left-1 top-1">IBAN</div>
	<div class="iban-container mx-auto p-4 pt-8 bg-white">
		<div class="flex items-center">
			<div data-clipboard="ibanValue" class="p-2 border rounded-md text-sm">{iban}</div>
			<button
				use:clipboard={{ element: 'ibanValue' }}
				class="ml-2 p-2 btn variant-filled rounded-md w-24"
				on:click={() => {
					copied = true;
					setTimeout(() => (copied = false), 1500);
				}}
			>
				{copied ? 'Copiato!' : 'Copia'}
			</button>
		</div>
	</div>
</div>

<style>
	/* Mobile Styles */
	@media (max-width: 640px) {
		.iban-container {
			width: 100%;
		}
	}

	/* Desktop Styles */
	@media (min-width: 641px) {
		.iban-container {
			max-width: 400px;
		}
	}
</style>

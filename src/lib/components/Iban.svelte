<!-- <script>
	import { clipboard } from '@skeletonlabs/skeleton';
</script>

<div data-clipboard="exampleElement">(contents)</div>
<button use:clipboard={{ element: 'exampleElement' }}>Copy</button> -->

<script>
	import { clipboard } from '@skeletonlabs/skeleton';

	let iban = 'IT20P0310411100000000400142';
	let copied = false;
</script>

<div class="mb-4 text-2xl ms-5 font-semibold">IBAN</div>
<div class="iban-container mx-auto p-4 hover:border hover:rounded-lg hover:shadow-lg bg-white">
	<div class="flex items-center">
		<div data-clipboard="ibanValue" class="w-72 p-2 border rounded-md text-sm">{iban}</div>
		<button
			use:clipboard={{ element: 'ibanValue' }}
			class="ml-2 p-2 bg-blue-500 text-white rounded-md w-24"
			on:click={() => {
				copied = true;
				setTimeout(() => (copied = false), 1500);
			}}
		>
			{copied ? 'Copiato!' : 'Copia'}
		</button>
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

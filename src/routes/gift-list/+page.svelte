<script>
	import Iban from '$lib/components/Iban.svelte';
	import canAccessReservedArea from '../../stores/reserved';

	canAccessReservedArea.set(false);
</script>

<h1 class="text-center text-4xl">Lista Nozze</h1>

<div class="pt-10 text-center">
	<Iban />
</div>

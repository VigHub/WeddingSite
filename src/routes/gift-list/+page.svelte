<script>
	import Iban from '$lib/components/Iban.svelte';
	import canAccessReservedArea from '../../stores/reserved';

	canAccessReservedArea.set(false);
</script>

<h1>Lista nozze</h1>

<div class="pt-10">
	<Iban />
</div>

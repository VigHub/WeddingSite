<script lang="ts">
	import ImageDesktopLayout from '$lib/components/ImageDesktopLayout.svelte';
	import ImageMobileLayout from '$lib/components/ImageMobileLayout.svelte';
	import canAccessReservedArea from '../stores/reserved';

	canAccessReservedArea.set(false);
</script>

<h1 class="text-center text-4xl mb-5">Benvenuti sul nostro sito!</h1>
<div class="block md:hidden">
	<ImageMobileLayout />
</div>
<div class="hidden md:block">
	<ImageDesktopLayout />
</div>

<div class="max-w-2xl gap-y-5 text-center">
	<p class="mt-5">Ciao a tutti!! Siamo Elisa e Gianluca, e avete sentito bene, ci sposiamo!!</p>
	<p>
		Non potremmo essere più felici, e non vediamo l'ora che sia il 20 luglio per condividere con voi
		una giornata così importante per noi.
	</p>
	<br />
	<p>
		In attesa del grande giorno abbiamo provato a sfruttare le nostre competenze informatiche e
		qualche idea grafica (indovinate rispettivamente di chi 😏) per creare questo sito che vi darà
		qualche informazione in più sul nostro matrimonio.
	</p>
	<br />
	<p>
		Troverete una sezione nella quale potrete confermare la vostra presenza, una nella quale vi
		abbiamo lasciato tutte le indicazioni utili, e una pagina da sbirciare per consultare la nostra
		lista nozze per scoprire quale sarà la nostra luna di miele…
	</p>
	<br />
	<p>
		Adesso vi lasciamo visitare il sito, ma non prima di ringraziarvi: se state leggendo questo
		messaggio è perché siete persone importanti per noi, e poter condividere con voi la nostra gioia
		renderà ancora più speciale il nostro matrimonio.
	</p>
	<br />
	<p>Grazie e a presto,</p>
	<br />
	<p>Elisa e Gianluca</p>
</div>

<script>
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
</script>

<h1>INFO</h1>
<div class="grid gap-y-5">
	<iframe
		title="Villa Canton"
		src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10173.80548480991!2d9.8411298!3d45.7000277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47815c1ab61e55d5%3A0x9e7b9c902b300478!2sVilla%20Canton!5e1!3m2!1sen!2sit!4v1694468097566!5m2!1sen!2sit"
		width="600"
		height="450"
		style="border:0;"
		referrerpolicy="no-referrer-when-downgrade"
	/>

	<Countdown target={'2024-07-20T15:00:00'} />
	<Carousel />
</div>

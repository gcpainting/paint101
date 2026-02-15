<script lang="ts">
	interface Category {
		id: string;
		name: string;
		slug: string;
		description: string;
		display_order: number;
	}

	interface Props {
		data: {
			category: Category[];
		};
	}

	let { data }: Props = $props();
</script>

<main class="mx-auto max-w-4xl p-8">
	<a href="/">back</a>
	<h1 class="mb-2 text-4xl font-bold">Categories</h1>
	<p class="mb-8 text-lg text-gray-600">Here are all the categories.</p>

	<section>
		<h2 class="mb-4 text-2xl font-semibold">All Categories</h2>
		<div class="space-y-4">
			{#each data.category as category}
				<a href="/categories/{category.slug}">{category.name}</a>
			{/each}
		</div>
	</section>
</main>

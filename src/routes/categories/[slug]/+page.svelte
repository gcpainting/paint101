<script lang="ts">
	interface Category {
		id: string;
		name: string;
		slug: string;
		description: string;
		display_order: number;
	}

	interface Props {
		data: { category: Category };
	}

	let { data }: Props = $props();
</script>

<main class="mx-auto max-w-4xl p-8">
	<!-- Back link -->
	<a href="/categories" class="text-blue-600 hover:underline">&larr; Back to all Categories</a>

	<h2>{data.category.name}</h2>
</main>

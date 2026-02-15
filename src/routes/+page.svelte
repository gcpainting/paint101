<script lang="ts">
	import { goto } from '$app/navigation';
	interface Category {
		id: string;
		name: string;
		slug: string;
		description: string;
		display_order: number;
	}

	interface Term {
		id: string;
		term: string;
		slug: string;
		definition: string;
		pronunciation: string | null;
		categories: { category: { id: string; name: string; slug: string } }[];
	}

	interface Props {
		data: {
			categories: Category[];
			terms: Term[];
			filters: { q: string; category: string };
		};
	}

	let { data }: Props = $props();

	// local state for search input
	let searchInput = $state(data.filters.q);

	// Update URL when searching
	function applySearch() {
		const params = new URLSearchParams();
		if (searchInput) params.set('q', searchInput);
		if (data.filters.category) params.set('category', data.filters.category);

		const queryString = params.toString();
		goto(`/${queryString ? '?' + queryString : ''}`, { keepFocus: true });
	}
	// Filter by category
	function filterByCategory(slug: string) {
		const params = new URLSearchParams();
		if (searchInput) params.set('q', searchInput);
		if (slug) params.set('category', slug);

		const queryString = params.toString();
		goto(`/${queryString ? '?' + queryString : ''}`);
	}

	// Clear all filters
	function clearFilters() {
		searchInput = '';
		goto('/');
	}
</script>

<main class="mx-auto max-w-4xl p-8">
	<h1 class="mb-2 text-4xl font-bold">Paint101</h1>
	<p class="mb-8 text-lg text-gray-600">A glossary of painting terms and techniques</p>
	<div class="mb-8 flex gap-2">
		<input
			type="text"
			placeholder="Search for terms"
			bind:value={searchInput}
			onkeydown={(e) => e.key === 'Enter' && applySearch()}
			class="flex-1 rounded-lg border border-gray-300 px-4 py-2"
		/>

		<button onclick={applySearch} class="rounded-lg bg-blue-600 px-4 py-2">Search</button>
	</div>

	{#if data.filters.q || data.filters.category}
		<div class="mb-8 flex items-center gap-2 text-sm">
			<span class="text-gray-600">Active filters:</span>
			{#if data.filters.q}
				<span class="rounded bg-blue-100 px-2 py-1 text-blue-800">
					Search: "{data.filters.q}"
				</span>
			{/if}
			{#if data.filters.category}
				<span class="rounded bg-blue-100 px-2 py-1 text-blue-800">
					Category: {data.filters.category}
				</span>
			{/if}
			<button onclick={clearFilters} class="text-red-600 hover:underline"> Clear all </button>
		</div>
	{/if}

	<section class="mb-12">
		<div class="flex justify-between">
			<h2 class="mb-4 text-2xl font-semibold">Categories</h2>
			<a href="./categories">See all</a>
		</div>
		<div class="grid grid-cols-3 gap-4">
			{#each data.categories as category}
				<button
					onclick={() => filterByCategory(category.slug)}
					class="rounded-lg border border-gray-200 p-4 text-left transition-shadow hover:shadow-md {data
						.filters.category === category.slug
						? 'border-blue-600 bg-blue-50'
						: 'border-gray-200'}"
				>
					<h3 class=" font-medium">{category.name}</h3>
					<p class="text-xs text-gray-600">{category.description}</p>
				</button>
			{/each}
		</div>
	</section>

	<section>
		<div class="flex justify-between">
			<h2 class="mb-4 text-2xl font-semibold">All Terms ({data.terms.length})</h2>
			<a href="./terms">See all</a>
		</div>
		<div class="space-y-4">
			{#each data.terms as term}
				<a
					href="./terms/{term.slug}"
					class="block rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
				>
					<div class="flex items-baseline gap-2">
						<h3 class="text-lg font-medium">{term.term}</h3>
						{#if term.pronunciation}
							<span class="text-sm text-gray-500 italic">/{term.pronunciation}/</span>
						{/if}
					</div>
					<p class="mt-1 text-gray-700">{term.definition}</p>
				</a>
			{/each}
		</div>
	</section>
</main>

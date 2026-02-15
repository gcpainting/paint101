import { supabase } from '$lib/server/supabase';

export const load = async ({ url }) => {
	const searchQuery = url.searchParams.get('q') || '';
	const categorySlug = url.searchParams.get('category') || '';

	const categoriesResult = await supabase.from('categories').select('*').order('display_order');

	// Build terms query
	let termsQuery = supabase
		.from('terms')
		.select(
			`
              *,
              categories:term_categories(
                  category:categories(id, name, slug)
              )
          `
		)
		.order('term');
	// Apply search filter if provided
	if (searchQuery) {
		termsQuery = termsQuery.or(`term.ilike.%${searchQuery}%,definition.ilike.%${searchQuery}%`);
	}
	// Execute terms query
	const { data: terms, error: termsError } = await termsQuery;

	// Error handling
	if (categoriesResult.error) {
		console.error('Categories error:', categoriesResult.error.message);
	}
	if (termsError) {
		console.error('Terms error:', termsError.message);
	}

	let filteredTerms = terms ?? [];
	if (categorySlug) {
		filteredTerms = filteredTerms.filter((term) =>
			term.categories.some((c) => c.category.slug === categorySlug)
		);
	}

	return {
		categories: categoriesResult.data ?? [],
		terms: filteredTerms,
		filters: { q: searchQuery, category: categorySlug }
	};
};

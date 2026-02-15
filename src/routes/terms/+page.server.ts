import { supabase } from '$lib/server/supabase';

export const load = async () => {
	const termsResult = await supabase
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
	// include terms categories
	if (termsResult.error) {
		console.error('Terms error:', termsResult.error.message);
	}

	return {
		terms: termsResult.data ?? []
	};
};

export const extractTags = (products) => {
    const brands = new Set();
    const categories = new Set();
  
    products.forEach((product) => {
      product.tags.forEach((tag) => {
        if (tag.startsWith('brand_')) {
          brands.add(tag.replace('brand_', ''));
        }
        if (tag.startsWith('category_')) {
          categories.add(tag.replace('category_', ''));
        }
      });
    });
  
    return {
      brands: Array.from(brands).map((name) => ({
        name,
        slug: name,
        image: `/brands/${name.toLowerCase()}.png` || '/toy_display.jpg',
      })),
      categories: Array.from(categories).map((name) => ({
        name,
        slug: name,
        image: `/categories/${name.toLowerCase()}.png` || '/toy_display.jpg',
      })),
    };
  };
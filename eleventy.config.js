import pluginRss from "@11ty/eleventy-plugin-rss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function (eleventyConfig) {
  
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/js");
  // Exclude certain tags from displaying
  eleventyConfig.addFilter("exclude", (arr, exclude) => arr.filter((el) => el !== exclude));
  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
  eleventyConfig.addCollection("tagList", (collections) => {
    const tags = collections
      .getAll()
      .reduce((tags, item) => tags.concat(item.data.tags), [])
      .filter((tag) => !!tag && !["post", "featured", "popular", "opinion", "all"].includes(tag))
      .sort();
    return Array.from(new Set(tags)).map((tag) => ({
      tag,
      count: collections.getFilteredByTag(tag).length
    }));
  });

  const english = new Intl.DateTimeFormat("en");
  eleventyConfig.addFilter("niceDate", function (d) {
    return english.format(d);
  });
  
  eleventyConfig.addCollection("status", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/status/*.md");
  });

  eleventyConfig.addCollection("updates", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/update/*.md");
  });
  
eleventyConfig.addCollection("artCategories", function (collectionApi) {
  let artCategories = new Set();
  let posts = collectionApi.getFilteredByTag('art') || [];
  posts.forEach(p => {
    let cats = p.data.artCategories || [];
    cats.forEach(c => {
      if (c) artCategories.add(c);
    });
  });
  return Array.from(artCategories);
});

eleventyConfig.addFilter("filterByArtCategory", function (posts, cat) {
  if (!posts || !cat) return [];
  cat = cat.toLowerCase();
  let result = posts.filter(p => {
    let cats = p.data.artCategories?.map(s => s ? s.toLowerCase() : "") || [];
    return cats.includes(cat);
  });
  return result;
});

  eleventyConfig.addCollection("categories", function (collectionApi) {
    let categories = new Set();
    let posts = collectionApi.getFilteredByTag('post');
    posts.forEach(p => {
      let cats = p.data.categories || [];
      cats.forEach(c => categories.add(c));
    });
    return Array.from(categories);
  });

  eleventyConfig.addFilter("filterByCategory", function (posts, cat) {
    cat = cat.toLowerCase();
    let result = posts.filter(p => {
      let cats = p.data.categories?.map(s => s.toLowerCase()) || [];
      return cats.includes(cat);
    });
    return result;
  });

  eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));

  function extractExcerpt(post) {
    if (!post.templateContent) return '';
    if (post.templateContent.indexOf('</p>') > 0) {
      let end = post.templateContent.indexOf('</p>');
      return post.templateContent.substr(0, end + 4);
    }
    return post.templateContent;
  }

  eleventyConfig.addFilter("findTagCount", (tagList, findTag) => tagList.find(({ tag }) => tag === findTag)?.count);
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
}
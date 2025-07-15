const { DateTime } = require("luxon");
const pluginSEO = require("eleventy-plugin-seo");

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "html", "njk", "md",
    "css", "jpeg", "jpg", "png", "svg", "woff", "woff2",
  ]);

  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  const seo = require("./src/seo.json");
  if (seo.url === "glitch-default") {
    seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
  }
  eleventyConfig.addPlugin(pluginSEO, seo);

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });

  eleventyConfig.addCollection("posts", function (collection) {
    const coll = collection.getFilteredByTag("posts").sort((a, b) => b.data.date - a.data.date);
    for (let i = 0; i < coll.length; i++) {
      coll[i].data["prevPost"] = coll[i - 1];
      coll[i].data["nextPost"] = coll[i + 1];
    }
    return coll;
  });

  eleventyConfig.addCollection("proj", function (collection) {
    const coll = collection.getFilteredByTag("proj").sort((a, b) => b.data.date - a.data.date);
    for (let i = 0; i < coll.length; i++) {
      coll[i].data["prevPost"] = coll[i - 1];
      coll[i].data["nextPost"] = coll[i + 1];
    }
    return coll;
  });

  eleventyConfig.addCollection("category", function (collection) {
    const coll = collection.getFilteredByTag("category").sort((a, b) => b.data.date - a.data.date);
    for (let i = 0; i < coll.length; i++) {
      coll[i].data["prevPost"] = coll[i - 1];
      coll[i].data["nextPost"] = coll[i + 1];
    }
    return coll;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "build",
    },
    pathPrefix: "/portfolio/", // your GitHub Pages repo name
  };
};






// const { DateTime } = require("luxon");
// const pluginSEO = require("eleventy-plugin-seo");

// /**
//  * This is the JavaScript code that determines the config for your Eleventy site
//  *
//  * You can add lost of customization here to define how the site builds your content
//  * Try extending it to suit your needs!
//  */

// module.exports = function (eleventyConfig) {
//   eleventyConfig.setTemplateFormats([
//     // Templates:
//     "html",
//     "njk",
//     "md",
//     // Static Assets:
//     "css",
//     "jpeg",
//     "jpg",
//     "png",
//     "svg",
//     "woff",
//     "woff2",
//   ]);
//   eleventyConfig.addPassthroughCopy("public");

//   /* From: https://github.com/artstorm/eleventy-plugin-seo
  
//   Adds SEO settings to the top of all pages
//   The "glitch-default" bit allows someone to set the url in seo.json while
//   still letting it have a proper glitch.me address via PROJECT_DOMAIN
//   */
//   const seo = require("./src/seo.json");
//   if (seo.url === "glitch-default") {
//     seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
//   }
//   eleventyConfig.addPlugin(pluginSEO, seo);

//   // Filters let you modify the content https://www.11ty.dev/docs/filters/
//   eleventyConfig.addFilter("htmlDateString", (dateObj) => {
//     return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
//   });

//   eleventyConfig.setBrowserSyncConfig({ ghostMode: false });


//   module.exports = function (eleventyConfig) {
//   return {
//     pathPrefix: "/oliviaem/build/"
//   };
// };


//   /* Build the collection of posts to list in the site
//      - Read the Next Steps post to learn how to extend this
//   */
//   //   eleventyConfig.addCollection("posts", function(collection) {

//   //     /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
//   //        - https://www.11ty.dev/docs/collections/
//   //     */

//   //     // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
//   //     // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
//   //     const coll = collection
//   //       .getFilteredByTag("posts");

//   //     // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
//   //     // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
//   //     for (let i = 0; i < coll.length; i++) {
//   //       const prevPost = coll[i - 1];
//   //       const nextPost = coll[i + 1];

//   //       coll[i].data["prevPost"] = prevPost;
//   //       coll[i].data["nextPost"] = nextPost;
//   //     }

//   //     return coll;
//   //   });

//   eleventyConfig.addCollection("posts", function (collection) {
//     /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
//        - https://www.11ty.dev/docs/collections/
//     */

//     // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
//     const coll = collection
//       .getFilteredByTag("posts")
//       .sort((a, b) => b.data.date - a.data.date);

//     // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
//     // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
//     for (let i = 0; i < coll.length; i++) {
//       const prevPost = coll[i - 1];
//       const nextPost = coll[i + 1];

//       coll[i].data["prevPost"] = prevPost;
//       coll[i].data["nextPost"] = nextPost;
//     }

//     return coll;
//   });

//  eleventyConfig.addCollection("proj", function (collection) {
//     /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
//        - https://www.11ty.dev/docs/collections/
//     */

//     // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
//     const coll = collection
//       .getFilteredByTag("proj")
//       .sort((a, b) => b.data.date - a.data.date);

//     // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
//     // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
//     for (let i = 0; i < coll.length; i++) {
//       const prevPost = coll[i - 1];
//       const nextPost = coll[i + 1];

//       coll[i].data["prevPost"] = prevPost;
//       coll[i].data["nextPost"] = nextPost;
//     }

//     return coll;
//   });
  
// //    eleventyConfig.addCollection("code", function (collection) {
//   //     /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
//   //        - https://www.11ty.dev/docs/collections/
//   //     */

//   //     // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
//   //     const coll = collection
//   //       .getFilteredByTag("code")
//   //       .sort((a, b) => b.data.date - a.data.date);

//   //     // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
//   //     // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
//   //     for (let i = 0; i < coll.length; i++) {
//   //       const prevPost = coll[i - 1];
//   //       const nextPost = coll[i + 1];

//   //       coll[i].data["prevPost"] = prevPost;
//   //       coll[i].data["nextPost"] = nextPost;
//   //     }

//   //     return coll;
//   //   });

//   //   eleventyConfig.addCollection("visart", function (collection) {
//   //     /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
//   //        - https://www.11ty.dev/docs/collections/
//   //     */

//   //     // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
//   //     const coll = collection
//   //       .getFilteredByTag("visart")
//   //       .sort((a, b) => b.data.date - a.data.date);

//   //     // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
//   //     // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
//   //     for (let i = 0; i < coll.length; i++) {
//   //       const prevPost = coll[i - 1];
//   //       const nextPost = coll[i + 1];

//   //       coll[i].data["prevPost"] = prevPost;
//   //       coll[i].data["nextPost"] = nextPost;
//   //     }

//   //     return coll;
//   //   });

  
// //   eleventyConfig.addCollection("writing", function (collection) {
// //     /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
// //        - https://www.11ty.dev/docs/collections/
// //     */

// //     // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
// //     const coll = collection
// //       .getFilteredByTag("writing")
// //       .sort((a, b) => b.data.date - a.data.date);

// //     // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
// //     // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
// //     for (let i = 0; i < coll.length; i++) {
// //       const prevPost = coll[i - 1];
// //       const nextPost = coll[i + 1];

// //       coll[i].data["prevPost"] = prevPost;
// //       coll[i].data["nextPost"] = nextPost;
// //     }

// //     return coll;
// //   });

//   eleventyConfig.addCollection("category", function (collection) {
//     /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
//        - https://www.11ty.dev/docs/collections/
//     */

//     // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
//     const coll = collection
//       .getFilteredByTag("category")
//       .sort((a, b) => b.data.date - a.data.date);

//     // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
//     // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
//     for (let i = 0; i < coll.length; i++) {
//       const prevPost = coll[i - 1];
//       const nextPost = coll[i + 1];

//       coll[i].data["prevPost"] = prevPost;
//       coll[i].data["nextPost"] = nextPost;
//     }

//     return coll;
//   });

  
//   return {
//     dir: {
//       input: "src",
//       includes: "_includes",
//       output: "build",
//     },
//   };
// };

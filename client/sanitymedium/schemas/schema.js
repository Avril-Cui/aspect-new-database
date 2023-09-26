// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import post from "./post";
import author from "./author";
import comment from "./comment";
import simulator_news from "./simulator_news";
import news from "./news";
import index_news from "./index_news";
import end_season_comment from "./end_season_comment";
import end_season_news from "./end_season_news";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    category,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    comment,
    simulator_news,
    news,
    index_news,
    end_season_comment,
    end_season_news,
  ]),
});

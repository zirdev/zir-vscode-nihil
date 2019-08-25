  <template lang="html">
  <div id="main-page" class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <RwvArticleMeta :article="article" :actions="true"></RwvArticleMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(article.body)"></div>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <RwvTag
                :name="tag"
                className="tag-default tag-pill tag-outline"
              ></RwvTag>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <RwvArticleMeta :article="article" :actions="true"></RwvArticleMeta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <RwvCommentEditor
            v-if="isAuthenticated"
            :slug="slug"
            :userImage="currentUser.image"
          >
          </RwvCommentEditor>
          <p v-else>
            <router-link :to="{ name: 'login' }">Sign in</router-link>
            or
            <router-link :to="{ name: 'register' }">sign up</router-link>
            to add comments on this article.
          </p>
          <RwvComment
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
          >
          </RwvComment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import RwvArticleMeta from "@/components/ArticleMeta";
import RwvComment from "@/components/Comment";
import RwvCommentEditor from "@/components/CommentEditor";
import RwvTag from "@/components/VTag";
import { FETCH_ARTICLE, FETCH_COMMENTS } from "@/store/actions.type";
export default {
  name: "rwv-article",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    RwvArticleMeta,
    RwvComment,
    RwvCommentEditor,
    RwvTag
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_ARTICLE, to.params.slug),
      store.dispatch(FETCH_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["article", "currentUser", "comments", "isAuthenticated"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>

<style lang="css">
:root {
  --breadcrumb-theme-1: #e91e63;
  --breadcrumb-theme-2: #d9d9d9;
  --breadcrumb-theme-3: #0d7ad7;
  --breadcrumb-theme-4: #fff;
  --breadcrumb-theme-5: #1a1a1a;
  --breadcrumb-theme-6: #969696;
  --breadcrumb-theme-7: #4f0720;
}
.breadcrumb {
  text-align: center;
  display: inline-block;
  box-shadow: 0 2px 5px rgba(0,0,0,0.25);
  overflow: hidden;
  border-radius: 5px;
  counter-reset: flag;
  border: thin solid rgba(26, 26, 26, 0.55);
}
.breadcrumb__step {
  text-decoration: none;
  outline: none;
  display: inline-block;
  float: left;
  font-size: 24px;
  line-height: 1em;
  height: 1em;
  /* width: 20px; */
  padding: 0 0.5em 0 2em;
  position: relative;
  background: var(--breadcrumb-theme-2);
  color: var(--breadcrumb-theme-5);
  transition: background 0.5s;
}
.breadcrumb__step:first-child {
  padding-left: 2em;
  /* border-radius:  0px 5px 5px 0px; */
}
.breadcrumb__step:first-child::before {
  left: 0.75em;
}
.breadcrumb__step:last-child {
  border-radius: 0 5px 5px 0;
  padding-right: 1.25em;
}
.breadcrumb__step:last-child::after {
  content: none;
}
.breadcrumb__step::before { /* circle pill */
  content: counter(flag);
  counter-increment: flag;
  border-radius: 100%;
  width: 1em;
  height: 1em;
  line-height: 1em;
  font-size: 0.75em;
  margin: 0.1em 0;
  position: absolute;
  top: 0.05em;
  left: 1.25em;
  font-weight: bold;
  background: var(--breadcrumb-theme-4);
  box-shadow: 0 0 0 0.085em var(--breadcrumb-theme-6);
}
.breadcrumb__step::after {
  content: '';
  position: absolute;
  top: 0;
  right: -0.35em;
  width: 1em;
  height: 1em;
  transform: scale(0.6) rotate(45deg);
  z-index: 1;
  /* border: thin solid red; */
  border-radius: 0 5px 0 15%;
  background: var(--breadcrumb-theme-2);
  transition: background 0.5s;
  box-shadow: 3px -3px 0 1px var(--breadcrumb-theme-4);
}
.breadcrumb__step--active {
  color: var(--breadcrumb-theme-4);
  background: var(--breadcrumb-theme-1);
}
.breadcrumb__step--active::before {
  color: var(--breadcrumb-theme-5);
  /* background: var(--breadcrumb-theme-1); */
  box-shadow: 0 0 0 1px var(--breadcrumb-theme-7);
}
.breadcrumb__step--active::after {
  background: var(--breadcrumb-theme-1);
}
.breadcrumb__step:hover {
  color: var(--breadcrumb-theme-4);
  background: var(--breadcrumb-theme-3);
  width: auto;
}
.breadcrumb__step:hover::before {
  color: var(--breadcrumb-theme-1);
}
.breadcrumb__step:hover::after {
  color: var(--breadcrumb-theme-1);
  background: var(--breadcrumb-theme-3);
}
</style>
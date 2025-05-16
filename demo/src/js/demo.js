import { configureLovit, createProfile, fetchLovit, throwError } from 'lovit';

// ---- Mock API functions ----

const createPostApi = async (successMessage) => {
  return new Promise((resolve) => {
    // Change status.code to trigger different error handlers
    setTimeout(() => resolve({ status: 200, message: successMessage }), 500);
  });
};

// ---- fetchLovit ----

const getPosts = async () => {
  const res = await fetchLovit({
    key: 'post.getPosts',
    url: 'http://localhost:3001/posts'
  });

  const posts = await res.json();

  return posts;
};

const createPost = async () => {
  const methodName = 'createPost';

  const res = await fetchLovit({
    key: 'post.createPost',
    requestFn: () => createPostApi('Post created successfully'),
    data: { methodName }
  });

  return res;
};

// ---- createProfile ----

const postProfile = createProfile({
  name: 'post',

  tasks: {
    getPosts: {
      notFound: (context) => {
        console.warn('⚠️ Posts not found:', context);
      },

      catch: (error) => {
        console.log(error.message);
        console.error('❌ Error fetching posts:', error);
      }
    },

    createPost: {
      badRequest: (context) => {
        console.warn('⚠️ Bad request:', context);
      },

      catch: (error) => {
        console.log(error);
        throwError({
          message: '❌ Error creating post',
          originErrorMessage: error.message
        });
      },

      finally: () => {
        console.log('🧹 Finished createPost');
      }
    }
  }
});

// ---- configureLovit ----

const lovit = configureLovit({
  modules: {
    post: {
      profile: postProfile,
      entryFunctions: { getPosts, createPost }
    }
  }
});

// ---- Usage ----

lovit.getPosts().then((posts) => console.log('📦 Posts:', posts));
lovit.createPost().then((result) => console.log('✅ Create post result:', result));

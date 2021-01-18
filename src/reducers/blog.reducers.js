import { blogConstants } from "../actions/constants";
const initState = {
  blogs: [],
  loading: false,
  error: "",
};
export const blogReducers = (state = initState, action) => {


  const buildNewBlogs = (parentId, blogs, blog) => {
    let myBlogs = [];
    if (parentId == undefined) {
      return [
        ...blogs,
        {
          _id: blog._id,
          blogCategory: blog.blogCategory,
          blogTitle: blog.blogTitle,
          blogText: blog.blogText,
          blogImage: blog.blogImage,
          slug: blog.slug
        },
      ];
    }
    for (let cat of blogs) {
      if (cat._id == parentId) {
        myBlogs.push({
          ...cat,
          children:
            cat.children 
              ? buildNewBlogs(
                  parentId,
                  [
                    ...cat.children,
                    {
                      _id: blog._id,
                      blogCategory: blog.blogCategory,
                      blogTitle: blog.blogTitle,
                      blogText: blog.blogText,
                      blogImage: blog.blogImage,
                      slug: blog.slug
                    },
                  ],
                  blog
                )
              : [],
        });
      } else {
        myBlogs.push({
          ...cat,
          children:
            cat.children
              ? buildNewBlogs(parentId, cat.children, blog)
              : [],
        });
      }
    }
    return myBlogs;
  };

  switch (action.type) {
    case blogConstants.GET_ALL_BLOG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case blogConstants.GET_ALL_BLOG_SUCCESS:
      state = {
        ...state,
        blogs: action.payload.blogs,
        loading: false,
      };
      break;
    case blogConstants.GET_ALL_BLOG_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case blogConstants.ADD_NEW_BLOG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case blogConstants.ADD_NEW_BLOG_SUCCESS:
      const blog = action.payload.blog;
      const updatedBlogs = buildNewBlogs(
        blog.parentId,
        state.blogs,
        blog
      );
      console.log(updatedBlogs);
      state = {
        ...state,
        blogs: updatedBlogs,
        loading: false,
      };
      break;
    case blogConstants.ADD_NEW_BLOG_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;

      case blogConstants.UPDATE_BLOG_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
      case blogConstants.UPDATE_BLOG_SUCCESS:
      state = {
        ...state,
        loading:false
      };
      break;
      case blogConstants.UPDATE_BLOG_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      };
      break;
      case blogConstants.DELETE_BLOG_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
      case blogConstants.DELETE_BLOG_SUCCESS:
      state = {
        ...state,
        loading:false
      };
      break;
      case blogConstants.DELETE_BLOG_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      };
      break;


  }
  return state;
};

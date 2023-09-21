import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { useState } from "react";
const PostsWidget = ({ userId, isProfile = false }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  // const [posts, setPosts] = useState();

  const getPosts = async () => {
    // const response = await fetch("http://localhost:3001/posts", {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // const data = await response.json();
    // console.log(data);
    // dispatch(setPosts({ posts: data }));
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("Fetched posts data:", data);
      dispatch(setPosts({ posts: data }));
      // setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    // setPosts(data);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
      .then(() => setLoading(false)) // Mark loading as complete
      .catch((error) => {
        console.error("Error fetching user posts:", error);
        setLoading(false); // Make sure loading is marked as complete even in case of an error
      });
    } else {
      getPosts()
      .then(() => setLoading(false)) // Mark loading as complete
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false); // Make sure loading is marked as complete even in case of an error
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  if (loading) {
    return <div>Loading...</div>;
  }
  // console.log("Sample post object:", posts[0]);
  return (
    // <></>
    <>
    
    {posts.length === 0 } 
    <div>No posts available</div>
    {posts?.map((post) => (
     <PostWidget
        key={post._id}
        postId={post._id}
        postUserId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        description={post.description}
        location={post.location}
        picturePath={post.picturePath}
        userPicturePath={post.userPicturePath}
        likes={post.likes}
        comments={post.comments}
      />
    ))}
         {/* {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            // key={_id}
            // postId={_id}
            // postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}  */}
  
    
        
    </>
  );
};

export default PostsWidget;

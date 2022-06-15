import React, { useState, useEffect } from "react"
import ReadService from "../services/ReadService"
import { Link, useNavigate } from "react-router-dom"

const ReadItem = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  let navigate = useNavigate();

  // TO load the post from the server
  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    ReadService.getAll()
    .then(response => {
      let myData = response.data.splice(0, 15);
      setPosts(myData);
      setLoading(false);
      console.log(myData);
    }).catch(e => {
      console.log(e);
    });
  }


  // function to delete post
  const deletePost = (id:any) => {
    console.log(id);
    
    ReadService.remove(id)
      .then(response => {
        console.log(response.data);
        console.log(posts);
        setPosts(posts.filter((post:any) => {
          return post.id !== id;
      }))
        
        navigate("/readposts");
      })
  }

  // Mapping the posts to the table
  let myPosts = posts?.map((post:any) => (
    <table key={post.id} className="table">
      <tbody className="tbody">
        <tr className="tr">
          <td className="id">{post.id}</td>
          <td className="userId">{post.userId}</td>
          <td className="title">{post.title}</td>
          <td className="body">{post.body}</td>
          <td className="update"><Link to={`/readposts/${post.id}`}>
            <button className="btn">update</button></Link>
          </td>
          <td className="delete"><button className="btn" onClick={() => deletePost(post.id)}>delete</button></td>
        </tr>
      </tbody>
    </table>
  ));

  return(  
    <div>
      {loading ? (
        <div>
          loading
        </div>
      ) : (
        <div className="Home">
          <div className="Home-create">
            <Link to={"/create"} className="btn-create">Create</Link>
          </div>
          <div className="post-list">
            <table className="table">
              <thead className="tbody">
                <tr className="tr">
                  <td className="id"><strong>Id</strong></td>
                  <td className="userId"><strong>UserId</strong></td>
                  <td className="title"><strong>Title</strong></td>
                  <td className="body"><strong>Body</strong></td>
                  <td className="update"><strong>Update</strong></td>
                  <td className="delete"><strong>Delete</strong></td>
                </tr>
              </thead>
            </table>
                {myPosts}
          </div>
        </div>
      ) }
    </div>
  )
}

export default ReadItem
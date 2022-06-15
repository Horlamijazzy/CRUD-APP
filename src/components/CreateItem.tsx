import React, { useState } from "react"
import ReadService from "../services/ReadService"
import { Link } from "react-router-dom";


export type postObject = {
  id?: number;
  userId?: number;
  title?: string;
  body?: string
}

const CreateItem = () => {
  const emptyPost = {
    id: undefined,
    title: "",
    userId: undefined,
    body: ""
  }
  const [submitted, setSubmitted] = useState(false);
  const [post, setPost] = useState<postObject>();


  // function to save new post
  const savePost = (e:any) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value);
    
    let data = {
      title: e.target[0].value,
      body: e.target[1].value
    };
    ReadService.create(data)
      .then(response => {
        setPost({
          id: response.data.id,
          userId: response.data.userId,
          title: response.data.title,
          body: response.data.body
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  // function to reset states and open form for creating another post
  const newPost = () => {
    setPost(emptyPost);
    setSubmitted(false);
  };

  return(
    <div className="create-post">
      {submitted ? (
        <div>
          <h2>Submitted successfully</h2>
          <div className="submitted">
            <button onClick={newPost} className="btn">Create</button>
            <Link to={`/readposts`}>
            <button className="btn">Home</button></Link>
          </div>
        </div>
      ) : (
        <div className="create-post">
          <form onSubmit={savePost}>
            <div className="form-control">
              <label htmlFor="title">Title: </label>
              <input 
                type="text"
                id="title"
                required
                name="title"
              />
            </div>
            <div className="form-control">
              <label htmlFor="body">Body: </label>
              <input 
                type="text"
                id="body"
                required
                name="body"
              />
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      )}
    </div>
  )
}


export default CreateItem
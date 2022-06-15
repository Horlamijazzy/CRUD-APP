import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ReadService from "../services/ReadService"
import { postObject } from "./CreateItem"


const UpdateItem = (props: any) => {

  const { id } = useParams();
  let navigate = useNavigate();

  const [myPost, setMyPost] = useState<postObject>();

  // function to fetch the post from server
  const getMyPost = (id:any) => {
    ReadService.get(id)
      .then(response => {
        setMyPost(response.data);
        console.log(response.data);
        // console.log();
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if(id){
      getMyPost(id);
    }
  }, [id]);

  const updateMyPost = (e:any) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value);
    
    let data = {
      title: e.target[0].value,
      body: e.target[1].value,
      id: myPost?.id,
      userId: myPost?.userId
    };
    ReadService.update(myPost?.id, data)
      .then(response => {
        setMyPost({ ...myPost, title: response.data.title, body: response.data.body});
        console.log(response.data);
        navigate("/readposts");
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className="update-post">
      <form onSubmit={updateMyPost}>    
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input 
            type="text"
            id="title"
            required
            name="title"
            defaultValue={myPost?.title}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Body</label>
          <input 
            type="text"
            id="body"
            required
            name="body"
            defaultValue={myPost?.body}
          />
        </div>
        <button type="submit" className="btn">Update</button>
      </form>
    </div>
  )

}

export default UpdateItem
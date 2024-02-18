import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/ClipLoader";
import Error from "./Error.jsx";

function UserPosts() {
  const { id } = useParams();
  const [userPost, setUserPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responde = await axios.get(`https://dummyjson.com/posts/${id}`);
        setUserPost(responde.data);
        setLoading(false);
      } catch (error) {
        setError({ message: error.message || "fetching failed " });
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <Error title="An error occured! " message={error.message} />;
  }
  return (
    <div className="container mx-auto p-8 mt-16 flex justify-center items-center">
      {loading ? (
        <div className="text-center p-16 pt-32">
          <BeatLoader color="red" />
        </div>
      ) : (
        userPost && (
          <div className="bg-white shadow-3xl rounded-md p-4 font-serif">
            <h2 className="text-lg font-semibold mb-2">{userPost.title}</h2>
            <p className="text-gray-600 mb-2">{userPost.body}</p>
            <p className="text-gray-600 mb-2">User ID: {userPost.userId}</p>
            <div className="flex flex-wrap gap-2">
              {userPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mt-2">
              Reactions: {userPost.reactions}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default UserPosts;

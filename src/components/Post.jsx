import { getPost } from "../api/Postapi";
import { useEffect } from "react"
import { useState } from "react"
import '../App.css'

export const Posts = () => {
    const [data, setData] = useState([]);

    console.log(getPost());

    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data); // data from api
        setData(res.data); // setting the data to state 

    }

    useEffect(() => {
        getPostData(); // calling the function
    }, [])

    return (
        <div>
            <ul className="post-list">
                {data.map((currElem) => {
                    const { id, title, body } = currElem;
                    return (
                        <li className="post-card" key={id}>
                            <p>Title : {title}</p>
                            <p>News :  {body}</p>
                            <div className="post-actions">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
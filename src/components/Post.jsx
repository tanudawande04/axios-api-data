import { deletePost, getPost } from "../api/Postapi";
import { useEffect } from "react"
import { useState } from "react"
import '../App.css'
import { Form } from "./Form";


export const Posts = () => {
    const [data, setData] = useState([]);
    const [updatedDataApi, setUpdatedDataApi] = useState({});

    console.log(getPost());

    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data); // data from api
        setData(res.data); // setting the data to state 

    }

    useEffect(() => {
        getPostData(); // calling the function
    }, [])

    const handleButtondlt = async (id) => {                            // bcz it is return promise (api k sath khelte hai )
        try {
            const res = await deletePost(id);
            console.log(res);

            if (res.status === 200) {
                const updatedData = data.filter((currPost) => {
                    return currPost.id !== id; // filter out the deleted post

                })
                setData(updatedData);
            } else {
                console.log("Failed to delete the post : ", res.status);

            }
        } catch (error) {
            console.log(error);


        }
    }

    const handleButtonEdit = (currElem) => {
        setUpdatedDataApi(currElem);
    }
    return (
        <>
            <section className="section-form">
                <Form data={data} setData={setData} updatedDataApi={updatedDataApi} setUpdatedDataApi={setUpdatedDataApi} />
            </section>
            <section>

                <ul className="post-list">
                    {data.map((currElem) => {
                        const { id, title, body } = currElem;
                        return (
                            <li className="post-card" key={id}>
                                <p>Title : {title}</p>
                                <p>News :  {body}</p>
                                <div className="post-actions">
                                    <button onClick={() => handleButtonEdit(currElem)}>Edit</button>
                                    <button onClick={() => handleButtondlt(id)}>Delete</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </>

    )
}
import { useEffect, useState } from "react"
import { addPost } from "../api/Postapi"


export const Form = ({ data, setData, updatedDataApi, setUpdatedDataApi }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: "",

    })

    useEffect(() => {
        updatedDataApi && setAddData({
            title: updatedDataApi.title || "",
            body: updatedDataApi.body || "",
        })
    }, [updatedDataApi])

    const handleinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddData((prev) => {
            return { ...prev, [name]: value }  //spread operator
        }) //name is dynamic only name change hoga or value values me aajagi according to name
    }

    const addPostData = async () => {
        try {
            const res = await addPost(addData);
            console.log(res);

            if (res.status === 201) {
                setData([...data, res.data]) // clear the form after successful submission
                setAddData({ title: "", body: "" }); // clear the form after successful submission
            }

        } catch (error) {
            console.log(error);


        }
    }

    // form submission

    const handleFormsubmit = (e) => {
        e.preventDefault();
        addPostData();

    }


    return (
        <form onSubmit={handleFormsubmit}>
            <div className="form-row">
                <input
                    type="text"
                    autoComplete="off"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={addData.title}
                    onChange={handleinput}
                />
                <input
                    type="text"
                    autoComplete="off"
                    id="body"
                    name="body"
                    placeholder="Add post"
                    value={addData.body}
                    onChange={handleinput}
                />
            </div>
            <button type="submit">Add</button>
        </form>


    )
}
export default Form
import { useEffect, useState } from "react"
import { addPost, updatePost } from "../api/Postapi"


export const Form = ({ data, setData, updatedDataApi, setUpdatedDataApi }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: "",

    })

    let isEmpty = Object.keys(updatedDataApi).length === 0; // object.keys() returns an array of the object's own enumerable property names. If the length is 0, the object is empty.
    //Object.keys() mtlb object ke andar kitne keys hai unka array return krega.

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

    // update method part 1
    const updatePostData = async () => {

        try {
            const res = await updatePost(updatedDataApi.id, addData);
            console.log(res);

            if (res.status === 200) {
                setData((prev) => {
                    return prev.map((currElem) => {
                        return currElem.id === res.data.id ? res.data : currElem; // if the id matches, replace the element with the updated data, otherwise keep the same element
                    })
                })

                setAddData({ title: "", body: "" }); // clear the form after successful submission
                setUpdatedDataApi({}) // clear the updatedDataApi after successful submission

            }


        } catch ({ error }) {
            console.log(error);

        }
    }


    // form submission

    const handleFormsubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value; // nativeEvent is used to access the native DOM event. submitter is a property of the native event that refers to the button that was used to submit the form. value is the value attribute of that button.
        if (action === "Add") {
            addPostData();
        } else if (action === "Edit") {
            updatePostData();

        }

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
            <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
        </form>


    )
}
export default Form
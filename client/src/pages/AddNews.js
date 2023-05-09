import React, { useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Layout from "../components/Layout";

const AddNews = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  const save = async () => {
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        postedBy: "Test User",
      };
      await axios.post("/api/newsitems/addnewsitem", payload);
      setLoading(false);
      toast("News added successfully", "success");
    } catch (error) {
      console.log(error);
      toast("Something went wrong", "error");
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mt-5 ml-5">Add News</h1>
      <div className="px-5 py-5">
        <input
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5"
          placeholder="Title"
        />
        <textarea
          className="border-2 w-full border-gray-300 my-2 px-5"
          rows="4"
          placeholder="Description"
        />
      </div>
      <div className="border-gray-400 mx-5 rounded px-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          editorClassName="draft-editor"
        />
      </div>
    </Layout>
  );
};

export default AddNews;

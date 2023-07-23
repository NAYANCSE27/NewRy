import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { json } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  async function createNewPost(ev) {
    ev.preventDefault();
    // const data = new FormData();
    // data.set("title", title);
    // data.set("summary", summary);
    // data.set("content", content);
    // data.set("file", files);
    // // console.log('Files : ', files);
    // console.log('Data : ', data);
    const data = {
      title: title,
      summary: summary,
      content: content,
      file: files,
    };

    console.log("Data : ", data);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: json.stringify({ title, summary, content, files }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("response : ", response);
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        // value={files}
        onChange={(ev) => setFiles(ev.target.value)}
      />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(newValue) => setContent(newValue)}
      />
      <button style={{ marginTop: "1vh" }}>Create Post</button>
    </form>
  );
}

export default CreatePost;

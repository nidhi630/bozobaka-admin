"use strict";

import React, {PropTypes} from "react";
import ReactQuill from "react-quill";

const EditorComponent = ({content, placeHolder, onChange, theme}) => {
    theme = theme || "snow";
    return (
        <ReactQuill
            value={content}
            theme={theme}
            onChange={onChange.bind(this)}
            modules={EditorComponent.modules}
            formats={EditorComponent.formats}
            placeholder={placeHolder}
        />
    );
};

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
EditorComponent.modules = {
    toolbar: [
        [{header: [1, 2, false]}, {font: []}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{list: "ordered"}, {list: "bullet"},
            {indent: "-1"}, {indent: "+1"}],
        ["link", "image", "video"],
        ["clean"]
    ]
};

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
EditorComponent.formats = [
    "header", "font", "size",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image", "video"
];

/*
 * PropType validation
 */
EditorComponent.prototype = {
    content: PropTypes.string,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default EditorComponent;
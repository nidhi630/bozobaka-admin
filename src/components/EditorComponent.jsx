"use strict";

import React, {PropTypes} from "react";
import ReactQuill from "react-quill";

const EditorComponent = ({content, placeHolder, onChange, theme, modules}) => {
    theme = theme || "snow";
    const editorModule = modules ? EditorComponent[modules] : EditorComponent.defaultModules;
    return (
        <ReactQuill
            value={content}
            theme={theme}
            onChange={onChange.bind(this)}
            modules={editorModule}
            formats={EditorComponent.formats}
            placeholder={placeHolder}
        />
    );
};

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
EditorComponent.defaultModules = {
    toolbar: [
        [{header: [1, 2, false]}, {font: []}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{list: "ordered"}, {list: "bullet"},
            {indent: "-1"}, {indent: "+1"}],
        ["link", "image", "video"],
        ["clean"]
    ]
};

EditorComponent.optionsModules = {
    toolbar: [
        [{header: [1, 2, false]}, {font: []}, "image"],
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
    onChange: PropTypes.func.isRequired,
    modules: PropTypes.object
};

export default EditorComponent;
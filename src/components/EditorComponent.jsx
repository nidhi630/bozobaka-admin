"use strict";

import React, {PropTypes} from "react";
import ReactQuill from "react-quill";

const EditorComponent = ({content, placeHolder, onChange}) => {
    return (
        <ReactQuill
            theme={'snow'}
            onChange={onChange.bind(this)}
            value={content}
            modules={Editor.modules}
            formats={Editor.formats}
            placeholder={placeHolder}
        />
    )
};

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
EditorComponent.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ]
}
/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
EditorComponent.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/*
 * PropType validation
 */
EditorComponent.prototype = {
    content: PropTypes.string,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

import React from 'react'
import {Editor} from "@tinymce/tinymce-react";

import './TinyMceEditor.css'

interface Props{
    dimension?: {
        height: number;
        width: number;
    }
}

const TinyMceEditor = () => {
    return(
        <Editor
            id="---"
            init={{
                plugins: "table",
                toolbar: " undo redo | tabledelete tableinsertrowbefore tableinsertrowafter tabledeleterow tableinsertcolbefore tableinsertcolafter tabledeletecol | removeformat | alignleft aligncenter alignright alignjustify | outdent indent | bold italic | link | print preview media fullpage",
                menubar: false,
                branding: false,
                statusbar: false,
            }}
        />
    )
}

export {TinyMceEditor}
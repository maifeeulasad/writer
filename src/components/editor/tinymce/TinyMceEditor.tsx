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
                plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                menubar: 'file edit view insert format tools table help',
                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                branding: false,
                statusbar: false,
            }}
        />
    )
}

export {TinyMceEditor}
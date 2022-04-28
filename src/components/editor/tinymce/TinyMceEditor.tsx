import React, {ForwardRefRenderFunction, useImperativeHandle, useRef} from 'react'
import {Editor} from "@tinymce/tinymce-react";

import './TinyMceEditor.css'

interface TinyMceEditorHandle {
    getHtml: () => string | undefined;
}

const TinyMceEditor: ForwardRefRenderFunction<TinyMceEditorHandle> = (_, forwardRef) => {
    // const ref = useRef<Editor | null>(null);

    useImperativeHandle(forwardRef, () => ({
        getHtml: () => '' // ref.current?.editor?.getContent()
    }));

    return (
        <Editor
            // ref={ref}
            init={{
                plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                menubar: 'file edit view insert format tools table',
                toolbar: 'toBlog | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                branding: false,
                statusbar: false,
                setup: (editor => {
                    // editor.ui.registry.addButton('toBlog', {
                    //     text: "To Blog",
                    //     onAction: () => {
                    //         console.debug(ref.current?.editor?.getContent())
                    //     }
                    // })
                })
            }}

        />
    )
}

export {TinyMceEditor}
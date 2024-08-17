"use client"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from "ckeditor5-custom-build"
function CustomEditor({ onChange, value }) {
  const API_URL = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL
  const UPLOAD_ENDPINT = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_ENDPINT

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
  }

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const formData = new FormData()
          loader.file.then((file) => {
            formData.append("file", file)

            // Add Cloudinary-specific upload options
            formData.append(
              "upload_preset",
              `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
            ) // Replace with your Cloudinary upload preset
            formData.append(
              "api_key",
              `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`
            ) // Replace with your Cloudinary API key

            fetch(`${API_URL}/${UPLOAD_ENDPINT}`, {
              method: "post",
              body: formData,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: res.secure_url })
              })
              .catch((err) => {
                reject(err)
              })
          })
        })
      },
    }
  }

  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "sourceEditing",
      "style",
      "code",
      "codeBlock",
    ],

    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },

        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },

    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
    extraPlugins: [uploadPlugin],
  }

  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData()
        onChange(data)
      }}
    />
  )
}

export default CustomEditor

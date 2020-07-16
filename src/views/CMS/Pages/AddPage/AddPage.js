import React, { useState, useEffect, useContext } from 'react'
// import { Editor } from 'react-draft-wysiwyg';
// import ReactQuill from  'react-quill'
// import 'react-quill/dist/quill.snow.css'
import { Form, FormGroup, Input, Label, Card, CardBody, Button, CardHeader, Row, Col } from 'reactstrap';
// import Paragraph from '@ckeditor/ckeditor5-react/dist/cked';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CompanyStore from '../../../../stores/CompanyStore';
import SweetAlert from 'react-bootstrap-sweetalert'; 

const schema = {
    title:  {
      isEmpty: false,
      min: 6,
      message: 'A valid category name is required'
    },
    description: {
      max: 100,
      message: 'description is required'
    }
  };  
  
const AddPage = ({  mode, initial_data}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const companyStore = useContext(CompanyStore);
    const { getPages, publish, setResponse, response, message } = companyStore;
    useEffect(() => {
        // setDescription('Lead developer is it working    setDescription j');
        
    }, [])
const handleChange = event => {
    event.persist();  
    setTitle(event.target.value); 
    };
const onEditorStateChange = (e, editor) => {
  const data = editor.getData(); 
    setDescription(data);
    // console.log('data', data);
}
const publishPage = e => {
  e.preventDefault();  
  const data = {
    title: title,
    description
  };
  publish(data);
   
  // console.log('data', data);
}
const updatePublishedPage = () => {

}
const resetForm = () => {
  setTitle('');
  setDescription('');
}
const hideAlert = () => {
  setResponse(false);
  resetForm();
}
    return (
        <div>
           {response  && 
       <SweetAlert
       success
       style={{display: "block", marginTop: "-50px"}}
       title="Server Message!" 
       confirmBtnBsStyle="info"
        onConfirm={() => hideAlert()}
       onCancel={() => hideAlert()}
   >
      {message}
   </SweetAlert>
      }
            <Form onSubmit={mode === 'Add'? publishPage : updatePublishedPage}>

           <Card>
             <CardHeader>
              <Row>
                <Col md={{ size: '3', offset: 9}}>
                  <Button type="submit" color="primary">Publish</Button>
                </Col>
                </Row>   

             </CardHeader>
             <CardBody>
             <FormGroup>
            <Label for="catName">Page title</Label>
            <Input
              type="text" 
              value={title || ''}
              name="title"
              id="catName"
              onChange={handleChange} 
              placeholder="Page title"
            />
          </FormGroup>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            // config={configuration}
            onChange={onEditorStateChange}  />
          {/* <ReactQuill
              modules={AddPage.modules}
              formats={AddPage.modules}
              value={description}
              theme="snow"
              placeholder="Body"
              onChange={onEditorStateChange} 
          />
          */}
             </CardBody>
           </Card>
 
            </Form>
        </div>
    )
}
// AddPage.modules = {
//     toolbar: { 
//       container: [
//         [{ 'header': [1, 2, 3, 4, 5, 6, false]}],
//         [{ 'font': [] }],
//         [{size: []}],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'},  {'indent': '+1'}],
//         [{'color': []}, {'background': []}],
//         [{'emoji': []}],
//         ['link', 'image', 'video'],
//         ['clean'],
//         ['code-block']
//       ]
//     },
//     clipboard: {
//       matchVisual: false,
//       matchSpacing: false
//     }
// };
// AddPage.formats = [
//       'header', 'font',
//       'bold', 'italic', 'underline', 'strike', 'blockquote',
//       'list', 'bullet', 'indent',
//       'link', 'image', 'video', 'code-block', 'color', 'background', 'emoji'
// ]
export default AddPage;
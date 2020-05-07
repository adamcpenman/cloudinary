// import React, { useState } from 'react';

// import './App.css';

// function App() {
//   const [image, setImage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const uploadImage = async (e) => {
//     const files = e.target.files;
//     const data = new FormData();
//     data.append('file', files[0]);
//     data.append('picture', this.state.files);
//     setLoading(true);
//     const res = await fetch('	http://localhost:5000/upload', {
//       method: 'POST',
//       body: data,
//     });
//     const file = await res.json();

//     setImage(file.secure_url);
//     setLoading(false);
//   };

//   return (
//     <div className='App'>
//       <h1>Upload Image</h1>
//       <input
//         type='file'
//         name='picture'
//         placeholder='Upload an image'
//         onChange={uploadImage}
//       />
//       {loading ? (
//         <h3>Loading...</h3>
//       ) : (
//         <img src={image} style={{ width: '300px' }} alt='' />
//       )}
//     </div>
//   );
// }

// export default App;

// import './App.css';

// function App() {
//   const [ selectedFile, setSelectedFile] = useState()

//   handleSelectedFile = (event) => {
//     setSelectedFile({
//       selectedFile: event.target.files[0]
//     })
//   }

//   handleUpload = () => {
//     const data = formData();
//     data.append('file', selectedFile, selectedFile.name)
//   }
//   return (
//     <div className='App'>
//       <input type='file' name='image' onChange={handleSelectedFile} />{' '}
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [state, setState] = useState('');

  const onFileChange = (e) => {
    setState({ picture: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //formdata is built in which helps sets a key/value in form fields
    const formData = new FormData();
    // the key value is picture, which is the key from multer on the back end
    formData.append('picture', state.picture);
    // update the project avatar with the link from cloudinary
    axios.put('http://localhost:5000/upload', formData, {}).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className='container'>
      <div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            {/* Input type file to allow the browse option on a computer */}
            <input type='file' onChange={onFileChange} />
          </div>
          <div>
            <button type='submit'>Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;

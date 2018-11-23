import React, { Component } from 'react';
import './App.css';
import fireStorage from './firebase';
import FileUploader from 'react-firebase-file-uploader';

class App extends Component {
  constructor(){
    super();
    this.state={
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    }
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    fireStorage.storage().ref("my_photos")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render(){
    return(
      <div id="imageUploder">
        <h1>Code Test <br/> Image Uploader</h1>
        <form>
          <FileUploader
            storageRef={
              fireStorage.storage().ref('my_photos')
            }
            onUploadStart = {this.handleUploadStart}
            onUploadError = {this.handleUploadError}
            onUploadSuccess = {this.handleUploadSuccess}
            onProgress = {this.handleProgress}
          />
        </form>
        <p>Process: {this.state.progress}%</p>
        <div className = "imageViewer">
          <img src={this.state.avatarURL} alt='' style={{width:'400px', height:'400px'}}/>
        </div>
      </div>
    )
  }
}

export default App;

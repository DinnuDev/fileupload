import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css'

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    // Placeholder API integration for file upload
    files.forEach(uploadFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
    // Placeholder API integration for file upload
    files.forEach(uploadFile);
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setUploadProgress(0);

    // Placeholder API endpoint
    const apiUrl = 'https://api.example.com/upload';

    // Placeholder API call for file upload
    fetch(apiUrl, {
      method: 'POST',
      body: formData,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div
      className={classNames('file-uploader', { 'dragging': dragging })}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className="file-list">
        {selectedFiles.map((file, index) => (
          <div key={index} className="file-item">
            <span className="file-name">{file.name}</span>
            <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
          </div>
        ))}
      </div>
      <div className="file-input">
        <label htmlFor="file-upload" className="file-label">
          <span className="file-icon">
            <i className="fa fa-cloud-upload"></i>
          </span>
          <span className="file-text">
            {dragging ? 'Drop files here' : 'Drag and drop files here or click to upload'}
          </span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};

export default FileUploader;

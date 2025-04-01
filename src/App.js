import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('nature');
  const [photos, setPhotos] = useState([]);
  const [modalImage, setModalImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiKey = "49615792-236c50ab390a6541f14d422b2"; 

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${apiKey}&q=${selectedCategory}&image_type=photo&per_page=9`
        );
        const data = await response.json();
        setPhotos(data.hits); 
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const openModal = (imageURL) => {
    setModalImage(imageURL);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  return (
    <div className="App bg-dark text-white min-vh-100">
      <div className="container py-4">
        <h1 className="text-primary text-center mb-4">Photo Gallery</h1>

   
        <div className="btn-group mb-4 d-flex justify-content-center" role="group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCategoryChange('nature')}
          >
            Nature
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => handleCategoryChange('architecture')}
          >
            Architecture
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCategoryChange('animals')}
          >
            Animals
          </button>
        </div>

   
        <div className="row">
          {photos.map((photo) => (
            <div className="col-md-4 mb-4" key={photo.id}>
              <div className="card bg-dark">
                <img
                  src={photo.previewURL}
                  alt={photo.tags}
                  className="card-img-top"
                  onClick={() => openModal(photo.largeImageURL)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      {isModalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          onClick={closeModal}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-primary">
              <div className="modal-header border-0">
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={modalImage}
                  alt="Enlarged"
                  className="img-fluid border border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
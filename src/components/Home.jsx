import React from 'react'
import Loader from './Loader';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ images, loader, setSaved, saved }) => {

  const saveImage = (img) => {
    let flag = true;

    if (saved != null && saved.length > 0) {
      for (let i = 0; i < saved.length; i++) {
        if (saved[i].id === img.id) {
          flag = false;
          //toastify
          toast.info('Image already saved!', {
            position: "top-right",
            autoClose: 4999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          console.log("image is already saved or exist");
          break;
        }
      }
    }
    if (flag) {
      setSaved([...saved, img]);
      // console.log("image is save");
      toast.success('👌Image saved!', {
        position: "top-right",
        autoClose: 4999,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
  }
  return (
    <>
    <ToastContainer/>
      <div className="container-fluid text-center" id='top'>
        {loader ? (
          <Loader />
        ) : (
          <div className="flex">
            {images.map((image) => (
              <div key={image.id} className='items'
                onClick={() => saveImage(image)}
              >
                <img src={image.src.medium} alt={image.photographer} />
              </div>
            ))}
          </div>
        )}
        {
          images.length != 0 && (
            <a href="#top" className='btn btn-warning my-5'>Back to Top</a>
          )
        }

      </div>
    </>
  )
}

export default Home;
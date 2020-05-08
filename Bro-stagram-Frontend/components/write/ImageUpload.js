import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UPLOAD_IMAGES_SUCCESS } from '../../reducers/post';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div className='ant-upload-text'>Upload</div>
  </div>
);

const ImageUpload = memo(({ images, setImages }) => {
  const { imageArray } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    // images: [
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url:
    //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // ],
  });

  const handleCancel = useCallback(() => {
    setState({
      ...state,
      previewVisible: false,
    });
  }, []);

  const handlePreview = useCallback(async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  }, []);

  const handleChange = useCallback(({ fileList }) => {
    // const imageFormData = new FormData();
    // fileList.forEach((f) => {
    //   return imageFormData.append('image', f.originFileObj);
    // });
    // console.log(images);
    // dispatch({
    //   type: UPLOAD_IMAGES_REQUEST,
    //   data: imageFormData,
    // });

    setImages(fileList);
  }, []);

  return (
    <div className='clearfix'>
      <form encType='multipart/form-data'>
        <Upload
          // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          action='http://localhost:3065/api/post/image'
          listType='picture-card'
          fileList={images}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {images && images.length >= 8 ? null : uploadButton}
        </Upload>
      </form>
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={state.previewImage} />
      </Modal>
    </div>
  );
});

export default ImageUpload;

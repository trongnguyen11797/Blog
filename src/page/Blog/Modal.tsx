import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { REGEX_URL } from 'src/common/constant';
import LoadingComponent from 'src/components/Loading';

import {
  ArgumentOnBlurForm,
  DataModalForm,
  DataModalFormKey,
  ModalListsType
} from 'src/models/blog.model';
import { CREATE_BLOG, EDIT_BLOG } from 'src/store/action';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

type Props = {
  modalLists: ModalListsType;
  setModalList: any;
};

const initialFormData: DataModalForm = {
  title: {
    value: '',
    msg: '',
  },
  content: {
    value: '',
    msg: '',
  },
  image: {
    value: '',
    msg: '',
  },
};

const ModalBlog = (props: Props) => {
  const { modalLists, setModalList } = props;

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { loadingCreate, loadingEdit } = useAppSelector((state) => state.blog);

  // Data form
  const [formData, setFormData] = useState<DataModalForm>(initialFormData);

  useEffect(() => {
    if (modalLists.data && Object.keys(modalLists.data).length > 0) {
      setFormData({
        title: {
          value: modalLists.data.title,
          msg: '',
        },
        content: {
          value: modalLists.data.content,
          msg: '',
        },
        image: {
          value: modalLists.data.image,
          msg: '',
        }
      });
    }
  }, [modalLists.data]);

  // Change the data
  const onChangeForm = ({ value, type }: { value: string; type: DataModalFormKey }) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: {
        value,
        msg: '',
      },
    }));
  };

  // Validate when blur form
  const onBlurForm = ({ value, type, msg }: ArgumentOnBlurForm) => {
    if (type === 'image' && value && !REGEX_URL.test(value)) {
      setFormData((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          msg: 'Valid url, example: http|https.xxx.xxx',
        },
      }));
      return;
    }
    if (!value) {
      setFormData((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          msg,
        },
      }));
    }
  };

  const onResetForm = () => {
    setFormData(initialFormData);
    setModalList({
      isShow: false,
      data: null,
    });
  };

  // Submit form
  const onSubmit = () => {
    if (Object.keys(formData).every((key) => !formData[key as DataModalFormKey].msg)) {
      if (modalLists.type === 'create') {
        dispatch({ type: CREATE_BLOG, payload: { data: formData, page: Number(searchParams.get('page')) || 1, onResetForm } });
      } else {
        dispatch({ type: EDIT_BLOG, payload: { data: { ...formData, id: modalLists.data?.id }, onResetForm } });
      }
    }
  };

  // hidden scroll body when modal show
  useEffect(() => {
    if (modalLists.isShow) document.body.style.overflowY = 'hidden';
    else document.body.style.removeProperty('overflow-y');
  }, [modalLists.isShow]);

  return (
    <div className={`blog__modal ${modalLists.isShow ? 'show' : ''}`}>
      <div className='inner'>
        <form>
          <h3 className='title'>
            {modalLists.type === 'create' ? 'Create blog' : 'Edit blog'}
          </h3>

          <div className='form-group'>
            <label htmlFor='exampleFormControlInput1'>Title</label>
            <input
              type='email'
              className='form-control'
              value={formData.title.value || ''}
              id='exampleFormControlInput1'
              placeholder='Input title'
              onChange={(e) => onChangeForm({ value: e.target.value.trim(), type: 'title' })}
              onBlur={(e) => onBlurForm({ value: e.target.value.trim(), type: 'title', msg: 'Title is required' })}
            />
            {formData.title.msg && <span className='error__msg'>{formData.title.msg}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='content'>Content</label>
            <textarea
              className='form-control'
              value={formData.content.value || ''}
              id='content'
              placeholder='Input content'
              rows={3}
              onChange={(e) => onChangeForm({ value: e.target.value.trim(), type: 'content' })}
              onBlur={(e) => onBlurForm({ value: e.target.value.trim(), type: 'content', msg: 'Content is required' })}
            />
            {formData.content.msg && <span className='error__msg'>{formData.content.msg}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='image'>Image</label>
            <input
              type='email'
              className='form-control'
              value={formData.image.value || ''}
              id='image'
              placeholder='Input image'
              onChange={(e) => onChangeForm({ value: e.target.value.trim(), type: 'image' })}
              onBlur={(e) => onBlurForm({ value: e.target.value.trim(), type: 'image', msg: 'Image is required' })}
            />
            {formData.image.msg && <span className='error__msg'>{formData.image.msg}</span>}
          </div>

          <div className='group__btn'>
            <button type='button' className='btn btn-light' onClick={onResetForm}>
              Cancel
            </button>

            <button
              type='button'
              className='btn btn-success'
              disabled={Object.keys(formData).some((key) => formData[key as DataModalFormKey].msg)}
              onClick={onSubmit}
            >
              {modalLists.type === 'create' ? 'Create' : 'Edit'}
            </button>
          </div>

          {(loadingCreate || loadingEdit) && <LoadingComponent isInside />}
        </form>
      </div>

      <div className='modal__overlay' />
    </div>
  );
};

export default ModalBlog;

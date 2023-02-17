export type BlogListType = {
  id: string;
  image: string;
  title: string;
  content: string;
}

export type DataModalFormKey = 'title' | 'image' | 'content';

export type DataModalForm = {
  title: {
    value: string;
    msg: string
  },
  content: {
    value: string;
    msg: string
  },
  image: {
    value: string;
    msg: string
  },
  id?: string;
}

export type ModalListsType = {
  isShow: boolean;
  data: BlogListType | null,
  type: 'create' | 'edit'
}

export type ArgumentOnBlurForm = { value: string; type: DataModalFormKey; msg: string }

export type ParamsType = {
  page?: string;
  sortBy?: string;
  order?: string;
  search?: string;
}

export type ResponseCreate = {
  config?: any;
  data: BlogListType | BlogListType[];
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
};

export type ArgumentSagaBlog = {
  data: DataModalForm;
  page?: number;
  onResetForm: () => void;
};

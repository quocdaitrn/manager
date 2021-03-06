import { API_ROOT } from 'src/constants';
import Request, { setData, setMethod, setParams, setURL, setXFilter } from 'src/services';

type Page<T> = Linode.ResourcePage<T>;
type Image = Linode.Image;

export const getImagesPage = (page: number, filter: object = {}) =>
  Request<Page<Image>>(
    setURL(`${API_ROOT}/images`),
    setMethod('GET'),
    setParams({ page }),
    setXFilter(filter),
  )
    .then(response => response.data);

export const getImages = () =>
  getImagesPage(1);

export const getUserImages = () =>
  getImagesPage(1, { "is_public": false });

export const getLinodeImages = () =>
  getImagesPage(1, { "is_public": true });

export const getImage = (imageId: string) =>
  Request<Image>(
    setURL(`${API_ROOT}/images/${imageId}`),
    setMethod('GET'),
  )
    .then(response => response.data);

export const updateImage = (imageId: string, label: string, description: string) =>
  Request<Image>(
    setURL(`${API_ROOT}/images/${imageId}`),
    setMethod('PUT'),
    setData({ label, description: getSafeDescription(description) }),
  );

export const createImage = (
  diskID: number,
  label: string,
  description: string,
) => Request<Image>(
  setURL(`${API_ROOT}/images`),
  setMethod('POST'),
  setData({ disk_id: diskID,
            label,
            description: getSafeDescription(description) }),
  );

export const deleteImage = (imageId: string) => {
  return Request<{}>(
    setURL(`${API_ROOT}/images/${imageId}`),
    setMethod('DELETE'),
  )
}

const getSafeDescription = (description: string) => {
  // Blank descriptions are represented as ' ' in the API;
  // API will return an error if passed the empty string.
  const trimmed = description.trim();
  return trimmed
         ? trimmed
         : ' ';
}

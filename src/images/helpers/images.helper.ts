import { v4 as uuidv4 } from 'uuid';
import { IImage } from '../interfaces/image.interface';

export function transformImage(data: Array<any>): Array<IImage> {
  return data.map((item) => ({
    id: uuidv4(),
    title: item.title,
    url: item.url || item.path,
  }));
}

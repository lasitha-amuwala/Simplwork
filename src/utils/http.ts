import { SimplworkApi } from './simplwork';

export const get = (url: string) => SimplworkApi.get(url).then((res) => res.data);
export const post = (url: string, data: any) => SimplworkApi.post(url, data);

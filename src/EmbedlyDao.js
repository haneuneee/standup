import request from 'axios';
import config from './config';
export default function getEmbedly(url){
  return request.get('http://iframe.ly/api/oembed',{
    params: {
      url : url,
      api_key : config.embedlyKey
    }
  });
}

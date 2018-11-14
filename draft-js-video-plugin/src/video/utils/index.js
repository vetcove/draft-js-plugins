const YOUTUBEMATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const VIMEOMATCH_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;// eslint-disable-line no-useless-escape
export default {
  isYoutube: (url) => YOUTUBEMATCH_URL.test(url),
  isVimeo: (url) => VIMEOMATCH_URL.test(url),
  getYoutubeSrc: (url) => {
    const id = url && url.match(YOUTUBEMATCH_URL)[1];
    let time_param = []
    if (url.split('?').length > 1) {
      time_param = url.split('?')[1].split('&').filter((e) => e.substring(0,2) === 't=')
    }
    const ret = {
      srcID: id,
      srcType: 'youtube',
      url
    };
    if (time_param.length > 0) { 
      ret['time'] = '?' + time_param[0].replace('t=', 'start='); 
    }
    return ret;
  },
  getVimeoSrc: (url) => {
    const id = url.match(VIMEOMATCH_URL)[3];
    return {
      srcID: id,
      srcType: 'vimeo',
      url,
    };
  },
  isValid: (url) => YOUTUBEMATCH_URL.test(url) || VIMEOMATCH_URL.test(url)
};

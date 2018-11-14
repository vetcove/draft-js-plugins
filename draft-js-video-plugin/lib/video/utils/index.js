'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var YOUTUBEMATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var VIMEOMATCH_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/; // eslint-disable-line no-useless-escape
exports.default = {
  isYoutube: function isYoutube(url) {
    return YOUTUBEMATCH_URL.test(url);
  },
  isVimeo: function isVimeo(url) {
    return VIMEOMATCH_URL.test(url);
  },
  getYoutubeSrc: function getYoutubeSrc(url) {
    var id = url && url.match(YOUTUBEMATCH_URL)[1];
    var time_param = [];
    if (url.split('?').length > 1) {
      time_param = url.split('?')[1].split('&').filter(function (e) {
        return e.substring(0, 2) === 't=';
      });
    }
    var ret = {
      srcID: id,
      srcType: 'youtube',
      url: url
    };
    if (time_param.length > 0) {
      ret['time'] = '?' + time_param[0].replace('t=', 'start=');
    }
    return ret;
  },
  getVimeoSrc: function getVimeoSrc(url) {
    var id = url.match(VIMEOMATCH_URL)[3];
    return {
      srcID: id,
      srcType: 'vimeo',
      url: url
    };
  },
  isValid: function isValid(url) {
    return YOUTUBEMATCH_URL.test(url) || VIMEOMATCH_URL.test(url);
  }
};
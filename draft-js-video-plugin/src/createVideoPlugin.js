import decorateComponentWithProps from 'decorate-component-with-props';
import addVideo from './video/modifiers/addVideo';
import DefaultVideoComponent from './video/components/DefaultVideoComponent';
import * as types from './video/constants';

const videoPlugin = (config = {}) => {
  const theme = config.theme ? config.theme : {};
  let Video = config.videoComponent || DefaultVideoComponent;
  if (config.decorator) {
    Video = config.decorator(Video);
  }
  const ThemedVideo = decorateComponentWithProps(Video, { theme });
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        const { src } = entity.getData();
        if (type === types.VIDEOTYPE) {
          return {
            component: ThemedVideo,
            editable: false,
            props: {
              src,
            },
          };
        }
      }

      return null;
    },
    addVideo,
    types,
  };
};

export default videoPlugin;

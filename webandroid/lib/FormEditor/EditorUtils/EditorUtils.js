import {
  create_quill,
  editor_css,
  editor_js,
  quill_js,
  quill_snow_css
} from './editor';

const Inital_Args = {
  initialHtml: '',
  placeholder: 'write here',
  toolbar: 'false',
  libraries: 'local',
  editorId: 'editor-container',
  containerId: 'standalone-container',
  color: 'black',
  backgroundColor: 'white',
  placeholderColor: 'rgba(0,0,0,0.6)',
  customStyles: [],
  defaultStyle: {}
}

export const createHtml = (args = Inital_Args) => {
  let initialHtml = args.initialHtml.split(/\r\n|\r|\n/);
  let updateHtml = initialHtml.join("<br/>")
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  ${ quill_snow_css(args.libraries === 'cdn')}
  ${editor_css(
    args.editorId,
    args.containerId,
    args.color,
    args.backgroundColor,
    args.placeholderColor,
    args.defaultStyle
  )}
  ${
    args.customStyles &&
    args.customStyles
      .map((style) => {
        return style.toLocaleLowerCase().trim().startsWith('<style>')
          ? style
          : `<style>${style}</style>`;
      })
      .join('\n')
  }
  </head>
  <body>
  <div id="${args.containerId}">
  <div id="${args.editorId}">
    ${updateHtml}
  </pre>
  </div>
  ${quill_js(args.libraries === 'cdn')}
  ${create_quill(args.editorId, args.toolbar, args.placeholder, args.theme)}
  ${editor_js}
  </body>
  </html>
  `;
};

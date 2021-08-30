export const create_quill = (
  id,
  toolbar,
  placeholder = '',
  theme
) => `
<script>
var quill = new Quill('#${id}', {
  modules: {
    toolbar: ${toolbar}
  },
  placeholder: '${placeholder}',
  theme: '${theme}'
});
</script>
`;

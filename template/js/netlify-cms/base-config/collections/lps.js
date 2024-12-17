export default ({ baseDir, sections }) => ({
    name: 'blow-gummies-teste',
    label: 'Blow',
    folder: `${baseDir}content/lps`,
    extension: 'json',
    create: true,
    slug: '{{slug}}',
    fields: [
      {
        label: 'LP',
        name: 'title',
        widget: 'string'
      },       
      {
        label: 'Imagem em Destaque',
        name: 'imagem',
        widget: 'image'
      },
      {
        label: 'Seções',
        name: 'sections',
        required: false,
        hint: 'Por padrão o layout será composto pelo que definir',
        widget: 'list',
        types: [
          {
            label: 'Corpo do post',
            name: 'blog-post',
            widget: 'object',
            fields: [
              {
                label: 'Exibir conteúdo do post',
                name: 'enabled',
                widget: 'boolean',
                default: true
              }
            ]
          }
        ].concat(sections)
      }
    ]
  })

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
          },
          {
            label: 'Bloca com CTA para LP',
            name: 'lpblock',
            widget: 'object',
            fields: [
              {
                label: 'Titulo do Cta',
                required: false,
                name: 'title',
                widget: 'string'
              },
              {
                label: 'Subtitulo do CTA',
                required: false,
                name: 'subtitle',
                widget: 'string'
              },
              {
                label: 'Imagem de fundo CTA',
                required: false,
                name: 'cta_background',
                widget: 'image',
                media_library: {
                  config: {
                    max_file_size: 1000000
                  }
                }
              },
              {
                label: 'Imagem de destaque CTA',
                required: false,
                name: 'cta_image_show',
                widget: 'image',
                media_library: {
                  config: {
                    max_file_size: 1000000
                  }
                }
              },
              {
                label: 'Título do bloco 1',
                required: false,
                name: 'title_block_1',
                widget: 'string'
              },
              {
                label: 'Subtítulo do bloco 1',
                required: false,
                name: 'subtitle_block_1',
                widget: 'string'
              },
              {
                label: 'Título do bloco 2',
                required: false,
                name: 'title_block_2',
                widget: 'string'
              },
              {
                label: 'Subtítulo do bloco 2',
                required: false,
                name: 'subtitle_block_2',
                widget: 'string'
              },
              {
                label: 'Título do bloco 3',
                required: false,
                name: 'title_block_3',
                widget: 'string'
              },
              {
                label: 'Subtítulo do bloco 3',
                required: false,
                name: 'subtitle_block_3',
                widget: 'string'
              },
              {
                label: 'Título comprar',
                required: false,
                name: 'cta_buy',
                widget: 'string'
              }     
            ]
          }
        ].concat(sections)
      }
    ]
  })

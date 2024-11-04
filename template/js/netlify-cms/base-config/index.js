import getSections from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections"
import getSettings from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/settings"
import getLayout from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/layout"
import getPages from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/pages"
import getBlogPosts from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/blog-posts"
import getExtraPages from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/extra-pages"
import getWidgets from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/widgets"

export default options => {
  options.sections = getSections(options).concat([
    {
      label: 'Lista de Produtos (Personalizado)',
      name: 'product-list',
      widget: 'object',
      fields: [
        {
          label: 'Produtos',
          name: 'products',
          widget: 'list',
          field: {
            label: 'SKU do produto',
            name: 'product_id',
            widget: 'select',
            options: options.state.routes
              .filter(({ sku }) => typeof sku === 'string')
              .map(({ _id, sku }) => ({
                label: sku,
                value: _id
              }))
          }
        },
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Link de destino',
          required: false,
          name: 'link',
          widget: 'string'
        }
      ]
    },
    {
        label: 'Faq',
        name: 'faq_list',
        widget: 'object',
        fields: [
          {
            label: 'Título da Seção',
            required: false,
            name: 'title',
            widget: 'string'
          },   
          {
            label: 'Bloco de perguntas',
            name: 'questions_block',
            widget: 'object',
            required:false,
            fields: [
                {
                    label: 'Título do Bloco',
                    required: false,
                    name: 'title',
                    widget: 'string',
                    hint: 'Caso queira inserir multi blocos, insira um título'
                },
                {
                    label: 'Perguntas',
                    name: 'questions',
                    widget: 'list',
                    required:false,
                    fields: [
                        {
                            label: 'Perguntas',
                            name: 'question',
                            widget: 'object',
                            required:false,
                            fields: [
                              {
                                label: 'Pergunta',
                                name: 'title',
                                widget: 'string'          
                              },
                              {
                                label: 'Resposta',
                                name: 'response',
                                widget: 'string'          
                              }              
                            ]
                        }
                    ]
                }         
            ]
          },        
        ]
    },
    {
      label: 'FAQ 2',
      name: 'mgnr_faq',
      widget: 'object',
      fields: [
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Descrição',
          required: false,
          name: 'description',
          widget: 'text'
        },
        {
          label: 'Posição da descrição',
          required: false,
          name: 'list',
          widget: 'select',
          options: ["description_first","description_last"]
        },        
        {
          label: 'Perguntas',
          name: 'questions',
          widget: 'list',
          required:false,
          fields: [
            {
              label: 'Pergunta',
              name: 'question',
              widget: 'object',
              required:false,
              fields: [
                {
                  label: 'Pergunta',
                  name: 'title',
                  widget: 'string'          
                },
                {
                  label: 'Resposta',
                  name: 'response',
                  widget: 'string'          
                }              
              ]
            },          
          ]
        },        
      ]
    },
    {
      label: "Faq por categoria",
      name: "faq",
      widget: "object",
      icon: "https://api.iconify.design/bi:grid.svg",
      fields: [
          {
              label: "Faqs",
              name: "faq-list",
              widget: "list",
              fields: [
                  {
                      label: "Slug da categoria/marca",
                      hint: "Será inserido com base no link da página destino ou se no produto tiver a categoria/marca",
                      name: "slug",
                      widget: "string",
                      required: false
                  },
                  {
                      label: "Texto do faq",
                      required: false,
                      name: "text",
                      widget: "markdown"
                  }
              ]
          }
      ]
  }
  ])

  return {
    backend: {
      name: "git-gateway",
      branch: "master",
      commit_messages: {
        create: "Create {{collection}} “{{slug}}”",
        update: "Update {{collection}} “{{slug}}”",
        delete: "Delete {{collection}} “{{slug}}”",
        uploadMedia: "Upload “{{path}}”",
        deleteMedia: "[skip ci] Delete “{{path}}”",
        openAuthoring: "{{message}}"
      }
    },
    logo_url: "https://ecom.nyc3.digitaloceanspaces.com/storefront/cms.png",
    locale: "pt",
    load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
    media_folder: `${options.baseDir}template/public/img/uploads`,
    public_folder: "/img/uploads",
    slug: {
      encoding: "ascii",
      clean_accents: true,
      sanitize_replacement: "-"
    },
    collections: [
      getSettings(options),
      getLayout(options),
      getPages(options),
      getBlogPosts(options),
      getExtraPages(options),
      getWidgets(options),
      {
        name: 'category_list',        
        label: 'Lista de links no menu',
        description: 'Configure a lista categorias ou links para menu',
        folder: `${options.baseDir}content/category_list`,
        extension: 'json',
        create: true,
        slug: '{{slug}}',
        fields: [
          {
            label: "Nome do link no menu",
            hint: "Insira o nome da categoria ou da página extra",
            name: "title",
            widget: "string"          
          }, 
          {
            label: "Link do menu",
            hint: "Insira o slug da categoria ou da página extra",
            name: "link",
            widget: "string"          
          },
        ]
      }
    ]
  }
}

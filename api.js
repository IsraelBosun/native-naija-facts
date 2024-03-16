import sanityClient from './sanity'
let sanityQuery = (query, params) => sanityClient.fetch(query, params)

export const getFacts = () => {
    return sanityQuery( `
    *[_type == 'category']{
        ...,
        category[]->{
          ...,
        }
      }
      
    `)
}

export const getCategories = () => {
    return sanityQuery (`
    *[_type == 'category']
    `)
}

export const getOnlyFacts = () => {
  return sanityQuery (`
  *[_type == 'fact']
  `)
}
    // *[_type == "fact"] {
    //     _id,
    //     id,
    //     image,
    //     longDetail,
    //     url1,
    //     url2,
    //     category-> {
    //       _ref,
    //       _type,
    //       _key,
    //       _updatedAt,
    //       slug {
    //         current,
    //         _type
    //       },
    //       shortDetail,
    //       title
    //     }
    //   }

    // *[_type == 'category'] {
    //     _id,
    //     name,
    //     image,
    //     'subcategories': category[]-> {
    //       _id,
    //       id,
    //       title,
    //       shortDetail,
    //       longDetail,
    //       url1,
    //       url2,
    //       slug {
    //         current
    //       },
    //       image {
    //         asset-> {
    //           url
    //         }
    //       }
    //     }
    //   }
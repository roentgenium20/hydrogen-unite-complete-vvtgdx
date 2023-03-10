// /src/routes/[handle].server.jsx
import { useShopQuery, gql } from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
import ProductDetails from '../../components/ProductDetails.client';
export default function Example({ params }) {
  const { handle } = params;
  const { data } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
  });
  console.log(data);

  return (
    <Layout>
      <ProductDetails product={data.product} />
    </Layout>
  );
}

const QUERY = gql`
  query product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      media(first: 10) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              id
              url
              altText
              width
              height
            }
          }
          ... on Video {
            mediaContentType
            id
            previewImage {
              url
            }
            sources {
              mimeType
              url
            }
          }
          ... on Model3d {
            mediaContentType
            id
            alt
            mediaContentType
            previewImage {
              url
            }
            sources {
              url
            }
          }
        }
      }
      variants(first: 250) {
        nodes {
          id
          title
          availableForSale
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            currencyCode
            amount
          }
          compareAtPriceV2 {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

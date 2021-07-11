import { gql, GraphQLClient } from "graphql-request";

export const getServerSideProps = async ({ params }) => {
  /**
   * use Absolute Url in serverside props;
   */
  const endpoint = "http://localhost:3000/api/graphql";

  const { id: cardId } = params;

  const graphQLClient = new GraphQLClient(endpoint, {});
  const query = gql`
    query getCard($id: String!) {
      getCard(id: $id) {
        name
        email
        phone
        github
        twitter
        website
        biography
      }
    }
  `;
  const variables = { id: cardId };

  const data = await graphQLClient.request(query, variables);
  const card = data.getCard;
  console.log(`data`, data);

  return {
    props: {
      card,
    },
  };
};

const CardId = ({ card }) => {
  return <div>{JSON.stringify(card, null, 4)}</div>;
};

export default CardId;

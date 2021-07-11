import { gql, GraphQLClient, request } from "graphql-request";
import React from "react";
import { useForm } from "react-hook-form";

/**
 * http://localhost:3000/card/2c65654b-cbab-4e70-b6b8-464d87136df5
 */
const Add = () => {
  const { register, handleSubmit, reset } = useForm();

  const onFormSubmit = async (values) => {
    const endpoint = "http://localhost:3000/api/graphql";

    // submit to graphql
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: "Bearer MY_TOKEN",
      },
    });

    /**
     * 這個是 完成後 return 回來的 name and id
     */
    const mutation = gql`
      mutation AddCard($input: CardInput!) {
        addCard(input: $input) {
          name
          id
        }
      }
    `;
    const variables = {
      input: values,
    };

    try {
      /**
       * 可以把 graphQLClient.request 完全當成是在 graphQL platform做的事 and format
       * Flow: 它去去call /api/graphql裡的 mutation AddCard function 然後 prisma 負責去talk to database
       */
      const data = await graphQLClient.request(mutation, variables);
      reset();
      /**
       * data
       * @Object return addCard: { name: 'nameValue', id: numberId }
       */
      console.log(`data`, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <label htmlFor="name">
              Name
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                className="bg-gray-100 w-full text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                className="bg-gray-100 w-full text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone
              <input
                {...register("phone", { required: true })}
                type="number"
                id="phone"
                className="bg-gray-100 w-full text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="biography">
              Biography
              <input
                {...register("biography", { required: true })}
                type="text"
                id="biography"
                className="bg-gray-100 w-full text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="twitter">
              Twitter
              <input
                {...register("twitter", { required: true })}
                type="text"
                id="twitter"
                className="bg-gray-100 w-full text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="website">
              Website
              <input
                {...register("website", { required: true })}
                type="text"
                id="website"
                className="bg-gray-100 w-full text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="github">
              Github
              <input
                {...register("github", { required: true })}
                type="text"
                id="github"
                className="bg-gray-100 w-full text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </label>
          </div>
          <button className="bg-green-500 px-3 py-1 rounded-md text-white" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;

export const ApiConfig = (async () => {
  const config = await fetch("./config.json");
  const abc = await config.json();
  return {
    API: {
      endpoints: [
        {
          name: "appApi",
          endpoint: abc.apiUrl,
        },
        {
          name: "authApi",
          endpoint: abc.authUrl,
        },
      ],
    },
  };
})();

/* const config = await fetch("./config.json").then((response) => response.json());

export const ApiConfig = {
  API: {
    endpoints: [
      {
        name: "appApi",
        endpoint: config.apiUrl,
      },
      {
        name: "authApi",
        endpoint: config.authUrl,
      },
    ],
  },
};
 */

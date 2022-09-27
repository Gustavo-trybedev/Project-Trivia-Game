const getTokenApi = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();
  return json;
};

export default getTokenApi;

import Cookies from "js-cookie";


const URL = import.meta.env.VITE_BACKEND_URL|| 'http://localhost:8383';

export const post = async (url, payload) => {
  try {
    let cookies = document.cookie;
    // if (!cookies) {
    //   cookies = -1;
    // }
    console.log(payload);
    const response = await fetch(`${URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
    // You can set state or perform other actions with responseData here
  } catch (error) {
    console.error("Error:", error);
  }
};
export const get = async (url) => {
  let cookies = document.cookie;
  const response = await fetch(`${URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: Cookies.get("token"),
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

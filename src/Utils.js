import axios from "axios";

export const getDate = (isoString, opt) => {
  const date = new Date(isoString);

  // Format the date to a readable format
  // You can customize the format as needed
  const options =
    opt !== undefined
      ? opt
      : {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        };

  return date.toLocaleString("en-US", options);
};

export const handlePostRequest = async (url, data, onSuccess, onError) => {
  const urlFinal = "${process.env.REACT_APP_REQUEST_URL}/" + url;
  try {
    const response = await axios.post(urlFinal, data, {
      withCredentials: true,
    });
    const { success, message } = response.data;
    console.log(data);
    if (success) {
      onSuccess(message);
    } else {
      onError(message);
    }
  } catch (error) {
    console.error("Error during POST request:", error);
    onError("An error occurred during the request.");
  }
};

export const handleGetRequests = async (url, onSuccess, referenceFlag) => {
  const handleError = (message) => {
    console.error(message);
    // Additional error handling logic can be added here.
  };
  try {
    const { data } = await axios.get(url);
    console.log(data);
    const { success, message } = data;
    if (success) {
      //   referenceFlag.current = true;
      onSuccess(data.data);
    } else {
      handleError(message);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

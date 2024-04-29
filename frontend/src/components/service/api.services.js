export const createRecord = async (url, body = null) => {
  
  try {
    if (!url) {
      throw new Error("URL or token or body missing");
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(body);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw
    };

    const response = await  fetch(`${process.env.REACT_APP_API_URL}${url}`, requestOptions)
    
    	const result = await response.json();

    	if (!result.status) {
    		throw new Error('Something went wrong');
    	}
    	return result
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (typeof error.message == "string") {
      errorMessage = error.message;
    }
    throw errorMessage;
  }
};

export const fetchRecords = async (url) => {
  try {
    if (!url) {
      throw new Error("URL or token missing");
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "GET",
    });

    const result = await response.json();

    // if (!result.status) {
    //   throw new Error("Something went wrong");
    // }
    return result.data;
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (typeof error.message == "string") {
      errorMessage = error.message;
    }
    throw errorMessage;
  }
};

export const deleteRecord = async (url, id) => {
  try {
    if (!url && !id) {
      throw new Error("URL or token or id missing");
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${url}/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!result.status) {
      throw new Error("Something went wrong");
    }
    return result;
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (typeof error.message == "string") {
      errorMessage = error.message;
    }
    throw errorMessage;
  }
};

export const bulkUpdateRecord = async (url, body = null) => {
  try {
    if (!url) {
      throw new Error("URL or token or body missing");
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(body);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw
    };


    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, requestOptions);
    const result = await response.json();

    if (!result.status) {
      throw new Error("Something went wrong");
    }
    return result;
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (typeof error.message == "string") {
      errorMessage = error.message;
    }
    throw errorMessage;
  }
};

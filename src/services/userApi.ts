/** 
 * User API service
 * 
 * This service is used to interact with the user API
 * 
 * @author Omer Malik
 */

import { urls } from "./urls";

export const userApi = {
  getUser: async () => {
    const response = await fetch(`${urls.testing}/user`);
    return response.json();
  },
};

    
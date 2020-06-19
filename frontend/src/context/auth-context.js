/* ----------------------------------------------------
React.js / Provider of auth info for all components

Updated: 06/19/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React from 'react';

export default React.createContext({
  token: null,
  userId: null,
  email: null,
  login: (token, userId, tokenExpiration, email) => {},
  logout: () => {},
});

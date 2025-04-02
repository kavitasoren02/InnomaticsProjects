import cookieParser from "cookie-parser";


const defaultCookieOptions = {
  maxAge: 9000000,
  httpOnly: true,  
  secure: true,   
  sameSite: 'None',
};


export const cookiesService = (app) => {
  app.use(cookieParser()); 
};


export const setCookie = (res, name, value, options = {}) => {
  const finalOptions = { ...defaultCookieOptions, ...options };
  res.cookie(name, value, finalOptions);
};


export const getCookie = (req, name) => {
  return req.cookies[name];
};


export const removeCookie = (res, name, options = {}) => {
  const finalOptions = { ...defaultCookieOptions, ...options };
  res.clearCookie(name, finalOptions);
};

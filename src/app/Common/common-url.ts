const mainURL="http://localhost:8080/vam/rest/";
//const mainURL="http://localhost:8080/";

export const admin = "admin/";
export const user = "user/";

export const login = mainURL + 'authenticate';
export const registerUser = mainURL +'register';

export const getAllRegisterdUsers = mainURL + admin+'register';
export const checkUserName = mainURL +'register/checkUsername';
export const getAllUsers = mainURL + admin+'register/getAllUsers';
export const getRegistrationById = mainURL +admin+ 'register/getRegistrationById';

export const role = mainURL + admin+'role';


export const application = mainURL + admin+'application';
export const applicationGetAll = mainURL + admin+'application';


export const userAppURL = mainURL + admin+'user-app';

export const allAppByUseId = mainURL + user+'user-app/all-app-by-user-id';

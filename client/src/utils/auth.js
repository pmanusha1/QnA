export const saveUser = (token, user) => {
    localStorage.setItem("userData", JSON.stringify({ token, user }));
};
  
export const getUser = () => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
};
  
export const logout = () => {
    localStorage.removeItem("userData");
};
export const TOKEN_KEY = "@cope-pay-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () =>
  JSON.parse(localStorage.getItem(TOKEN_KEY)) || {
    firstName: "Usuário",
    role: "Função",
  };
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

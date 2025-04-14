export const baseUrl = "http://localhost:4747";

const SummaryApi = {
  register: {
    url: "api/user/register",
    method: "post",
  },
  login: {
    url: "api/user/login",
    method: "post",
  },
};

export default SummaryApi;

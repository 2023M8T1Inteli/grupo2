import axios from "axios";

export const codeBridge = {
  async processCode(code: string) {
    const result = await axios.post("http://127.0.0.1:8000/compile", {
      code: code,
    });
    return result.data;
  },
};

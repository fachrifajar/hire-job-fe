import axios from "axios";

export default function handler(req, res) {
  try {
    const { fullname, email, phone_number, password } = req.body;
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, {
        fullname,
        email,
        phone_number,
        password,
      })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error);
        res.status(error?.status ?? 400).json(error?.response?.data);
      });
  } catch (error) {
    res.status(500).json("internal server error");
  }
}

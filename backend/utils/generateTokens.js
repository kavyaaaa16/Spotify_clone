//to skip the login step after registeration, we allow them to directly login after registeration

import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
  // Generate JWT token using user id and secret key
  const token = jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );


    res.cookie("token", token, {
        maxAge: 15*24*60*60*1000,   //cookie age- for 15 days
        httpOnly:true,        //security purpose
        sameSite: "lax",  //secutity purpose
        secure : false,
        path: "/",
    });

};

export default generateToken;
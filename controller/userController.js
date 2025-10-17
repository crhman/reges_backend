// import { TokenExpiredError } from 'jsonwebtoken';
import User from '../models/User.js';
import generateToken from '../token/generateToken.js';


export const login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const userExists = await User.findOne({email});

        if(!userExists){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

      if(userExists.password !== password){
        return res.status(401).json({
            success: false,
            message: "Invalid "
        });
      }  
        res.status(200).json({
            success: true,
            data: userExists,
            message: "Login successful",
            Token: generateToken(userExists._id)
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
           });
        
    }
}




export const createUser = async (req,res)=>{
    
    try {
            const {name,email,password , phone} = req.body;

    const newUser = new User({
        name,
        email,
        password,
        phone
    });

   const savedUser = await newUser.save();
    res.status(201).json({
        success: true,
        data: savedUser,
        message: "User created successfully"
});
    } catch (error) {
       res.status(500).json({
        success: false,
        message: "Server error"
       }); 
    }

};
export const updateUser = async (req, res) => {
  try {
    const {id } = req.params
    const { name, email, phone, password } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        data: null,
        message: "user not found" });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.password = password;

  
    const updatedUser = await user.save();

    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully"
    });

    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
  

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        data: null,
        message: "user not found" });
    }


    res.status(200).json({
        success: true,
        data: null,
        message: "User deleted successfully"
    });

    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

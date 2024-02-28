import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minLength:[3,"name must contain atleast 3 characters"],
        maxLength:[50,"name cannot exceed 50 characters"],
    },
    email:{
            type:String,
            required: true,
            validate:[validator.isEmail,"Provide a valid email"],
    },
    password:{
      type:String,
      required: true,
      minLength:[6,"password must contain atleast 6 characters"],
      maxLength:[15,"name cannot exceed 50 characters"],
    },
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipes'
  }],
  favoriteRecipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipes'
  }],
},
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
);

export const users = mongoose.model("users",userSchema);
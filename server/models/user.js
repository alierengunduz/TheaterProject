const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //  console.log(this);
  //  yeni kullanıcı oluştururken yada şifreyi güncellerken şifreyi hashleyip kaydediyoruz
  // Eğer login işlemi yapıyorsa şifre değişmemiş olacak ve bu durumda şifreyi tekrar hashlemeye gerek yok
  // yada kullanıcı sadece email yada name güncelliyorsa yine şifreyi tekrar hashlemeye gerek yok
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// login işleminde kullanıcının girdiği şifre ile db'deki şifreyi karşılaştırmak için kullanılır
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

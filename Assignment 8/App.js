import express from 'express';
import { connect, Schema, model } from 'mongoose';
import  bodyParser  from 'body-parser';
import { hash } from 'bcrypt';
import  dotenv  from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;


// CONNECT TO MONGODB
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    validate: /^[A-Za-z\s.'-]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: /^[a-zA-Z0-9._-]+@northeastern\.edu$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// HASH PASSWORD BEFORE SAVING TO DB

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 10);
  }
  next();
});

const User = model('User', userSchema);

app.use(bodyParser.json());


// CREATE USER

app.post('/user/create', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // VALIDATE PASSWORD STRENGTH

    if (!password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/)) {
      return res.status(400).json({ message: 'Please use password with uppercase, lowercase and special character with min 8 character length' });
    }
    else if(!email.match(/^[a-zA-Z0-9._-]+@northeastern\.edu$/)){
      return res.status(400).json({message: 'Please use northeastern email' });
    }
    else if(!fullName.match(/^[A-Za-z\s.'-]+$/)){
      return res.status(400).json({message: 'Invalid Full Name'});
    }
    else{
      const user = new User({ fullName, email, password });
      await user.save();

      res.status(201).json({ message: "User created successfully" });
    }

  } catch (error) {
    res.status(400).json({ message: 'User already exists in database' });
  }
});


// UPDATE USER

app.put('/user/edit', async (req, res) => {
  try {
    const { fullName, password } = req.body;

    // VALIDATE FULLNAME AND PASSWORD

    if (!fullName.match(/^[a-zA-Z\s]+$/)) {
      return res.status(400).json({ message: 'Invalid Full Name' });
    }

    if (!password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/)) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { fullName, password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid full name or password or user already exists in database' });
  }
});




// DELETE USER

app.delete('/user/delete', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid email' });
  }
});


// GET ALL USERS

app.get('/user/getAll', async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email password');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
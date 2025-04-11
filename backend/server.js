const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const UserData = require("./models/UserData"); // make sure the path is correct


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema, 'UserDetails');



// Define schema for each level
const levelSchema = new mongoose.Schema({
  title: String,
  content: String,
  link : String
}, { _id: false });

// Full module schema
const ModuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  levels: {
    basic: levelSchema,
    intermediate: levelSchema,
    advanced: levelSchema
  }
});

const Module = mongoose.model("Module", ModuleSchema, "Module");

const userDataSchema = new mongoose.Schema({
  username: String,
  moduleName: String,
  level: String,
  score: Number,
  correctCount: Number,
  incorrectCount: Number,
  completed: Boolean,
  attemptCount: { type: Number, default: 0 }
});



const UserData = mongoose.model("UserData", userDataSchema, "UserData");


const QuestionSchema = new mongoose.Schema({
  module: String,
  level: String,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    }
  ]
});

const QuestionsLevel = mongoose.model("QuestionsLevel", QuestionSchema, "QuestionsLevel"); // 👈 collection name




// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "Username already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ success: true, message: "Signup successful!" });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    res.json({ success: true, message: "Login successful", username: user.username });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/module/check/:moduleName", async (req, res) => {
    const moduleName = req.params.moduleName.toLowerCase(); // normalize
    try {
      const module = await Module.findOne({ name: moduleName });
      if (module) {
        res.json({ exists: true });
      } else {
        res.status(404).json({ exists: false });
      }
    } catch (err) {
      // console.error("Error checking module:", err);
      res.status(500).json({ exists: false });
    }
  });
  
  


app.get("/api/module/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      const moduleData = await Module.findOne({ name });
      if (!moduleData) {
        return res.status(404).json({ success: false, message: "Module not found" });
      }
  
      res.json({ success: true, data: moduleData });
    } catch (err) {
      // console.error("Error fetching module:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

// server.js or wherever your routes are
app.get('/api/module/:moduleName/:level', async (req, res) => {
  const { moduleName, level } = req.params;

  try {
    const module = await Module.findOne({ name: moduleName.toLowerCase() });

    if (!module) return res.status(404).json({ error: "Module not found" });

    const levelContent = module.levels?.[level];

    if (!levelContent) return res.status(404).json({ error: "Level not found" });

    res.json(levelContent);
  } catch (err) {
    // console.error("❌ Error fetching level:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// GET /api/test-questions/:module/:level
app.get("/api/test-questions/:moduleName/:level", async (req, res) => {
  const { moduleName, level } = req.params;

  try {
    const data = await QuestionsLevel.findOne({
      module: moduleName.toLowerCase(),
      level: level.toLowerCase()
    });

    if (!data) return res.status(404).json({ error: "Test not found" });

    res.json({ success: true, questions: data.questions });
  } catch (err) {
    // console.error("❌ Error fetching test questions:", err);
    res.status(500).json({ error: "Server error" });
  }
});







// POST /api/test-submit
// app.post('/api/test-submit', async (req, res) => {
//   try {
//     // console.log("📩 Incoming request at /api/test-submit:");
//     // console.log(req.body);

//     const { username, moduleName, level, userAnswers } = req.body;

//     if (!username || !moduleName || !level || !Array.isArray(userAnswers)) {
//       // console.log("🚫 Missing or invalid data in request body.");
//       return res.status(400).json({ error: "Invalid request data" });
//     }

//     const testData = await QuestionsLevel.findOne({
//       module: moduleName.toLowerCase(),
//       level: level.toLowerCase()
//     });

//     if (!testData || !testData.questions) {
//       // console.log("❌ Test data not found for", moduleName, level);
//       return res.status(404).json({ error: "Questions not found" });
//     }

//     const correctAnswers = testData.questions.map(q => q.correctAnswer);
//     let score = 0;

//     userAnswers.forEach((ans, index) => {
//       if (parseInt(ans) === parseInt(correctAnswers[index])) {
//         score++;
//       }
//     });

//     const completed = score >= 15;

//     await UserData.findOneAndUpdate(
//       { username, moduleName, level },
//       { score, completed },
//       { upsert: true, new: true }
//     );

//     // console.log(`✅ Score submitted for ${username} - Score: ${score}, Passed: ${completed}`);
//     res.status(200).json({ score, completed });

//   } catch (err) {
//     // console.error("❌ Server Error in /api/test-submit:", err.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });







app.post('/api/test-submit', async (req, res) => {
  try {
    const { username, moduleName, level, userAnswers } = req.body;

    if (!username || !moduleName || !level || !Array.isArray(userAnswers)) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const testData = await QuestionsLevel.findOne({
      module: moduleName.toLowerCase(),
      level: level.toLowerCase()
    });

    if (!testData || !testData.questions) {
      return res.status(404).json({ error: "Questions not found" });
    }

    const correctAnswers = testData.questions.map(q => q.correctAnswer);
    let correctCount = 0;

    userAnswers.forEach((ans, index) => {
      if (parseInt(ans) === parseInt(correctAnswers[index])) {
        correctCount++;
      }
    });

    const totalQuestions = correctAnswers.length;
    const incorrectCount = totalQuestions - correctCount;
    const completed = correctCount >= 15;

    const existingData = await UserData.findOne({ username, moduleName, level });

    if (existingData) {
      // Increment attempt count
      await UserData.findOneAndUpdate(
        { username, moduleName, level },
        {
          $set: {
            score: correctCount,
            correctCount,
            incorrectCount,
            completed
          },
          $inc: { attemptCount: 1 }  // <-- This line increments attempt count
        },
        { upsert: true, new: true }
      );
      
      
    } else {
      // Create new record with attemptCount = 1
      await UserData.create({
        username,
        moduleName,
        level,
        score: correctCount,
        correctCount,
        incorrectCount,
        completed,
        attemptCount: 1
      });
    }

    res.status(200).json({
      score: correctCount,
      correctCount,
      incorrectCount,
      completed
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});






// Route 1: Get completed levels for a user and module
app.get('/api/completed-levels/:userId/:module', async (req, res) => {
  const { userId, module } = req.params;

  try {
    const completedLevels = await UserData.find({
      username: userId,
      moduleName: module,
      completed: true,
    }).select('level -_id');

    const levels = completedLevels.map(doc => doc.level);
    res.json({ completedLevels: levels });

  } catch (err) {
    // console.error("Error fetching completed levels:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// Route 2: Get user progress for a module (based on % completed levels)
app.get('/api/user-progress/:userId/:module', async (req, res) => {
  const { userId, module } = req.params;

  try {
    const totalLevels = await UserData.countDocuments({
      username: userId,
      moduleName: module
    });

    const completedCount = await UserData.countDocuments({
      username: userId,
      moduleName: module,
      completed: true
    });

    const progress = totalLevels > 0 ? (completedCount / totalLevels) * 100 : 0;
    res.json({ progress });

  } catch (err) {
    // console.error("Error fetching progress:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// Add this in server.js or your routes file
app.get('/api/module/completed/:userId/:moduleName', async (req, res) => {
  const { userId, moduleName } = req.params;

  try {
    const completedLevels = await UserData.find({
      username: userId,
      moduleName: moduleName,
      completed: true
    }).select('level');

    const requiredLevels = ['basic', 'intermediate', 'advanced'];
    const completedLevelNames = completedLevels.map(l => l.level.toLowerCase());

    const isCompleted = requiredLevels.every(level =>
      completedLevelNames.includes(level)
    );

    res.json({ completed: isCompleted });
  } catch (err) {
    // console.error("Error checking module completion:", err);
    res.status(500).json({ error: "Server error" });
  }
});



  

app.get('/api/user-progress/:username/:moduleName/:level', async (req, res) => {
  const { username, moduleName, level } = req.params;

  try {
    const user = await UserData.findOne({ username, moduleName, level });

    if (!user) {
      return res.json({ attemptCount: 0 }); // First time
    }

    return res.json({ attemptCount: user.attemptCount || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch attempt count' });
  }
});


  
  
  
  
  



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

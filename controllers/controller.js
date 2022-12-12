const User = require("../models/user");

const CompletePayment = async (user_id) => {
  const currUser = await User.findById(user_id);
  console.log("currUser: ", currUser.enrolled);
  if (!currUser.enrolled) {
    console.log("Payment successfull for user_id " + user_id);
    return true;
  } else {
    console.log("User is already enrolled");
    return false;
  }
};

// User enrollment form

exports.enrollForm = (req, res) => {
  res.render("enroll");
};

exports.completePayment = (req, res) => {
  res.render("payment", { user_id: req.params.id });
};

exports.enroll = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    const newUser = await User.create({
      username: req.body.username,
      age: req.body.age,
      batch: req.body.batch,
    });
    console.log(newUser);

    res.redirect("/complete-payment/" + newUser._id);
  } else {
    res.send("Username should be unique");
  }
};

exports.completeEnrollment = async (req, res) => {
  console.log("Patch route triggered: " + req.params.id);

  console.log(
    "CompletePayment(req.params.id):",
    await CompletePayment(req.params.id)
  );

  if (await CompletePayment(req.params.id)) {
    const enrolledUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        enrolled: true,
      },
      { new: true }
    );

    res.render("payment-success", { user: enrolledUser });

    // console.log(`Payment successful for ${enrolledUser}`);
  } else {
    res.render("payment-fail");
    console.log("Payment failed");
  }
};

// change batch form
exports.changeBatchForm = (req, res) => {
  // res.send("change batch form");
  res.render("changeBatch");
};

exports.changeBatch = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  // check if user is registered or not
  if (!user) {
    res.send("User is not registered");
    return;
  }

  // Check if user is enrolled or not
  if (user.enrolled) {
    const updatedUser = await User.findOneAndUpdate(
      { username: user.username },
      { batch: req.body.batch },
      { new: true }
    );
    console.log("Updated user:", updatedUser);
    res.render("changeBatch-success");
  } else {
    res.send("User is not enrolled");
  }

  // res.send("change batch patch route for username:" + req.body.username);
};

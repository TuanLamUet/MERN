const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@desc Get current uers profile
//@access Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user',
        ['name', 'avatar']
        );

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   Post api/posts
// @desc    Create or update user profile
// @access Pr, ivate
router.post(
    '/',
    [
      auth,
      [
      check('status','status is required')
        .not()
        .isEmpty(),
      check('skills', 'skills is required ')
        .not()
        .isEmpty()
        ]
    ],
    async(req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }

      const {
          company,
          website,
          location,
          bio,
          status,
          githubusername,
          skills,
          youtube,
          facebook,
          twitter,
          instagram,
          linkedin
      } = req.body;

      //build profile object 
      const profileFields = {};
      profileFields.user = req.user.id;
      if(company) profileFields.company = company;
      if(website) profileFields.website = website;
      if(location) profileFields.location = location;
      if(bio) profileFields.bio = bio;
      if(status) profileFields.status = status;
      if(githubusername) profileFields.githubusername = githubusername;
      if(skills) {
          profileFields.skills = skills.split(',').map(skill => skill.trim());
      }

      //Build social object

      profileFields.social = {}
      if(youtube) profileFields.social.youtube = youtube;
      if(twitter) profileFields.social.twitter = twitter;
      if(facebook) profileFields.social.facebook = facebook;
      if(linkedin) profileFields.social.linkedin = linkedin;
      if(instagram) profileFields.social.instagram = instagram;

      try {
          let profile = await Profile.findOne({user: req.user.id});

          if(profile) {
            //Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
          }
          profile = new Profile(profileFields);

          await profile.save();
          res.send(profile);


      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error')
      }

      res.send('hello')
    }
  );

// @route   GET api/profile
// @desc    get all profiles
// @access Public
router.get('/', async(req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name','avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server is error')
  }
});

// @route   GET api/profile/user/userID
// @desc    get user profile
// @access Public
router.get('/user/:user_id', async(req, res) => {
try {
  const profile = await Profile.findOne({
    user: req.params.user_id
  }).populate('user', ['name', 'avatar']);

  if(!profile) {
    return res.status(400).json({ msg: 'profile not found'});
  }
  res.json(profile);
} catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({msg: 'Profile not found'});
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/profile
// @desc    delete profile, user and post
// @access Private

router.delete('/', auth, async(req, res) => {
try {
  //Remove profile
  await Profile.findOneAndRemove({
    user: req.user.id
  });
  await User.findOneAndRemove({ _id: req.user.id });

  res.json({msg: 'User delete'})
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
}
});


module.exports = router;

const express = require('express');
const route = express.Router();
const multer = require('multer');
const cors = require('cors');
const cntrl = require('.././../controllers/user_controllers/users_controller');
route.use(cors());
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../../uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, r.body.image)
    }
  })
  const multipart = require('connect-multiparty')
  var upload = multer({ storage: storage })
  const multipartMiddleware = multipart({
    uploadDir: './src/assets/uploads',
})
route.get('/users',cntrl.getUser);
route.post('/login_url',cntrl.userLogin);
route.post('/user_register_url',cntrl.userSinup);
route.post('/search_key_url',cntrl.searchKey);
route.post('/search_city_url',cntrl.searchCity);
route.post('/search_jobs_url',cntrl.searchJob);
route.post('/get_user_details_url',cntrl.getUserData);
route.post('/update_skills_details_url',cntrl.updateUserSkills);
route.post('/get_skills_details_url',cntrl.getSkills);
route.post('/update_profile_details_url',cntrl.updateUserPrfile);
route.post('/update_emplyement_details_url',cntrl.updateEmployement);
route.post('/update_resume_heading_url',cntrl.updateResumeHeading);
route.post('/update_profile_summary_url',cntrl.updateProfileSummary);
route.post('/update_education_details_url',cntrl.updateEducations);
route.post('/add_education_details_url',cntrl.addEducations);
route.post('/get_education_details_url',cntrl.getEducation);
route.post('/resume_upload_url',multipartMiddleware,cntrl.fileUpload);

module.exports = route;

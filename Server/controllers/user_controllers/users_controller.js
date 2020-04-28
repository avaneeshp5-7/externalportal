const connection = require('../../config/connections/con');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var image_url="";
  exports.fileUpload = (req, res) => { 
    image = req.files;
    image_url = image.uploads[0].path.slice(19); 
    res.json({
      success: true,
      message: 'Resume Uploaded !'
    });
}
exports.getUser = (req, res) => {
  connection.query('SELECT * FROM user_reg', (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: 'Invalid Credentials !'
      });
    } else {
      res.json({
        success: true,
        message: ' User List !',
        data: result
      });
    }
  });
}
exports.userLogin = (request, response) => {
  var email = request.body.Email;
  var password = request.body.Password;
  var sql = 'SELECT * FROM user_reg WHERE Email = ? AND Password = ?';
  //   bcrypt.compare(password, hash).then(function(result) {
  //     // result == true
  // });
  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      response.json({
        success: false,
        message: err
      });
    } else {
      if (result.length === 1) {
        response.json({
          success: true,
          data: result,
          message: 'User login !'
        });
      } else {
        response.json({
          success: false,
          data: err,
          message: 'Invalid credentials'
        });
      }
    }
  });
}
exports.userSinup = (rq, rs) => {
  delete rq.body.confirmPassword;
  var email = rq.body.Email;
  var password = rq.body.Password;
  var sql = 'SELECT * FROM user_reg WHERE Email = ? AND Password = ?';
  var sqls = "INSERT INTO user_reg SET ?";
  connection.query(sql, [email, password], (er, resu) => {
    if (resu.length === 1) {
      rs.json({
        success: false,
        message: 'Email exist, Please try another email id !'
      });
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        rq.body.Password = hash
        connection.query(sqls, rq.body, (errs, results) => {
          if (errs) {
            rs.json({
              success: false,
              message: errs,
            });
          } else {
            rs.json({
              success: true,
              message: 'User sinup successfully !',
              data: results
            });
          }
        });
      });
    }
  });
}
exports.searchKey = (requests, res) => {
  var key = requests.body.key ? requests.body.key : null;
  connection.query(`SELECT * FROM skills WHERE skills LIKE '${key}%'`, (errors, results) => {
    if (errors) {
      res.send({
        success: false,
        data: results
      });
    } else {
      res.send({
        success: true,
        data: results,
        message: 'Skills List !'
      });
    }
  });
}
exports.searchCity = (requests, res) => {
  var key = requests.body.key ? requests.body.key : null;
  connection.query(`SELECT * FROM cities WHERE cityname LIKE '${key}%'`, (errors, results) => {
    if (errors) {
      res.send({
        success: false,
        data: results
      });
    } else {
      res.send({
        success: true,
        data: results,
        message: 'Skills List !'
      });
    }
  });
}
exports.searchJob = (requests, res) => {
  var jobname = requests.body.key;
  var location = requests.body.city;
  var expfrom = requests.body.experience.exp;
  var sql = 'SELECT * FROM job_tables WHERE jobname = ? AND location = ? AND expfrom=?';
  connection.query(sql, [jobname, location, expfrom], (err, results) => {
    if (err) {
      res.send({
        success: false,
        data: results
      });
    } else {
      res.send({
        success: true,
        data: results,
        message: 'Job List !'
      });
    }
  });
}

exports.getEducation=(req,res)=>{
  var userid = req.body.id;
  var sqls='select * from  educations WHERE userid=?'
connection.query(sqls,[userid],(err,results)=>{
  if (err) {
    res.send({
      success: false,
      data: results ,
      message:err
    }); 
  } else {
    res.send({
      success: true,
      data: results,
      message: 'Educations List !'
    });
  }
});
}
exports.getUserData = (requests, res) => {
  var id = requests.body.id;
  var sql = 'select * from user_reg ur join emplyement em on ur.id = em.userid WHERE ur.id=?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      res.send({
        success: false,
        data: results 
      }); 
    } else {
      res.send({
        success: true,
        data: results,
        message: 'User profile List !'
      });
    }
  });
}
exports.updateUserSkills = (requests, res) => {
  var userid = requests.body.userid;
  var skill = requests.body.skills;
  connection.query("update userskills SET skillname = '" + skill + "' where userid = '" + userid + "'", (err, results) => {
    if (err) {
      res.send({
        success: false,
        data: results,
        message: err
      });
    } else {
      res.send({
        success: true,
        data: results,
        message: 'User skill updated !'
      });
    }
  });
}
exports.getSkills = (req, res) => {
  var userid = req.body.userid;
  var sql = 'SELECT * FROM userskills WHERE userid = ?';
  connection.query(sql, [userid], (er, result) => {
    if (er) {
      res.send({
        success: false,
        data: results,
        message: err
      });
    } else {
      res.send({
        success: true,
        data: result,
        message: 'skill List !'
      });
    }
  });
}
exports.updateUserPrfile = (req, res) => {
  var data = req.body;
  var userid = req.body.userid;
  data['id'] = req.body.userid;
  delete req.body.userid
  var sql = 'update user_reg set ? WHERE id = ?';
  connection.query(sql, [data, userid], (er, result) => {
    if (er) {
      res.send({
        success: false,
        data: result,
        message: er
      });
    } else {
      res.send({
        success: true,
        data: data,
        message: 'Candidate Updated !'
      });
    }
  });
}
exports.updateEmployement = (req, res) => {
  var sq = 'SELECT * FROM emplyement WHERE emplyement.userid=?';
  connection.query(sq, [req.body.userid], (empty, find) => {
    if (find.length === 1) { 
      req.body.resumetext=image_url;
      var sqls = 'update emplyement set ? WHERE userid = ?';
      connection.query(sqls, [req.body, req.body.userid], (e, r) => {
        if (e) {
          res.send({
            success: false,
            message: e,
            data: []
          })
        } else {
          res.send({
            success: true,
            message: 'Employment Updated !!',
            data: r
          })
        }
      })
    } else {
      var sql = "INSERT INTO emplyement SET ?";
      connection.query(sql, req.body, (err, result) => {
        if (err) {
          res.send({
            success: false,
            message: err,
            data: []
          })
        } else {
          res.send({
            success: true,
            message: 'Employment Updated !!',
            data: result
          })
        }
      });
    }
  });
}
exports.updateResumeHeading = (req, res) => {
  if (req.body) {
    connection.query("update user_reg SET resumeheadline	 = '" + req.body.resumeheadline + "' where id = '" + req.body.userid + "'", (e, r) => {
      if (e) {
        res.send({
          success: false,
          message: e,
          data: []
        })
      } else {
        res.send({
          success: true,
          message: 'Resume headline updated !!',
          data: r
        })
      }
    })
  }
}
exports.updateProfileSummary = (req, res) => {
  if (req.body) {
    connection.query("update user_reg SET profilesummary	 = '" + req.body.profilesummary + "' where id = '" + req.body.userid + "'", (e, r) => {
      if (e) {
        res.send({
          success: false,
          message: e,
          data: []
        })
      } else {
        res.send({
          success: true,
          message: 'Profile summary updated !!',
          data: r
        })
      }
    })
  }
} 
exports.addEducations = (req, res) => {
  delete req.body.eduid;
  var sql = "INSERT INTO educations SET ?";
  connection.query(sql, req.body, (err, result) => {
    if (err) {
      res.send({
        success: false,
        message: err,
        data: []
      })
    } else {
      res.send({
        success: true,
        message: 'Education added !!',
        data: result
      })
    }
  })
}
exports.updateEducations = (req, res) => {
  var sqls = 'update educations set ? WHERE eduid = ?';
  connection.query(sqls, [req.body, req.body.eduid], (e, r) => {
    if (e) {
      res.send({
        success: false,
        message: e,
        data: []
      })
    } else {
      res.send({
        success: true,
        message: 'Education Updated !!',
        data: r
      })
    }
  })
}

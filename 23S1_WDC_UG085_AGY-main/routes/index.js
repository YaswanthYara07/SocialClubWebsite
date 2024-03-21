
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {


 res.sendStatus(200);
});






router.post('/google', async (req, res) => {

  const user = {
    user_nme: "Google",
    role: 'User' // Example role, you can customize this based on your hierarchy
  };
  req.session.user=user;
res.sendStatus(200);

});



/*  SIGN UP PAGE */
router.post('/signup',function(req,res, next){

  req.pool.getConnection(function(err,connection){
    if(err){
      res.sendStatus(500);
      return;
    }
const{
first_name,last_name,email,phone,dob,course,password,username
}=req.body;

  var query='INSERT INTO user (user_id,first_name,last_name,email,phone,dob,course,password,username) VALUES (NULL,?,?,?,?,?,?,?,?)';
connection.query(query,[first_name,last_name,email,phone,
  dob,course,password,username],function(err1,rows,fields){
    connection.release();
    if(err1){
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
    // res.json(rows);
  });
});
});


/* Sign Up Page */
router.post('/signin',function(req,res, next){

  req.pool.getConnection(function(err,connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var user_nme=req.body.user_name;
    var pass=req.body.password;
   /* var email=req.body.email;
    var address=req.body.address;
    var phone=req.body.phone; */

  var query=`SELECT COUNT (*) AS count FROM user where username=? AND password=?`;
  // var query1=`SELECT COUNT(*) FROM users WHERE username = ${pass}`;
  connection.query(query,[user_nme,pass],function(err1,rows){
    connection.release();
    if(err1){
      res.sendStatus(500);
      return;
    }

    var counts=rows[0].count;
      if(counts>0){
        const user = {
          user_nme,
          role: 'User' // Example role, you can customize this based on your hierarchy
        };
        req.session.user = user;

        res.send(true);





      }else{
        // alert("Wrong username of password");

        res.send(false);
      }
    // res.json(rows[0]);

    // res.json(rows);
  });
});
});


/* Sign-up admin */
router.post('/adminin',function(req,res, next){

  req.pool.getConnection(function(err,connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var user_nme=req.body.user_name;
    var pass=req.body.password;
   /* var email=req.body.email;
    var address=req.body.address;
    var phone=req.body.phone; */

  var query='SELECT COUNT (*) AS count FROM user LEFT JOIN admin ON user_id = admin.u_id WHERE username=? AND password=?;';

  // var query1=`SELECT COUNT(*) FROM users WHERE username = ${pass}`;
  connection.query(query,[user_nme,pass],function(err1,rows){
    connection.release();
    if(err1){
      res.sendStatus(500);
      return;
    }

    var counts=rows[0].count;
      if(counts>0){
        const user = {
          user_nme,
          role: 'admin' // Example role, you can customize this based on your hierarchy
        };
        req.session.user = user;

        res.send(true);

      } else{
        // alert("Wrong username of password");

        res.send(false);
      }
    // res.json(rows[0]);

    // res.json(rows);
  });
});
});



// clubin

router.post('/clubin',function(req,res, next){

  req.pool.getConnection(function(err,connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var user_nme=req.body.user_name;
    var pass=req.body.password;
   /* var email=req.body.email;
    var address=req.body.address;
    var phone=req.body.phone; */

  var query='SELECT COUNT (*) AS count FROM user LEFT JOIN manager ON user_id = manager.u_id WHERE username=? AND password=?;';

  // var query1=`SELECT COUNT(*) FROM users WHERE username = ${pass}`;
  connection.query(query,[user_nme,pass],function(err1,rows){
    connection.release();
    if(err1){
      res.sendStatus(500);
      return;
    }

    var counts=rows[0].count;
      if(counts>0){
        const user = {
          user_nme,
          role: 'clubmanager' // Example role, you can customize this based on your hierarchy
        };
        req.session.user = user;

        res.send(true);

      } else{
        // alert("Wrong username of password");

        res.send(false);
      }
    // res.json(rows[0]);

    // res.json(rows);
  });
});
});


/* Post Form */
router.get('/post',function(req,res, next){

res.sendStatus(200);


});


router.get('/logout',function(req,res, next){
  // console.log(req.session.user.user_nme);
 // if ('user_nme' in req.session.user) {
  req.session.destroy();
    res.end();
// } else {
  //  res.sendStatus(403);
// }


  });

router.post('/posted', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const {
      dates, post_name, post_content,publicPrivate
    } = req.body;
    // const { dates, post_name, post_content } = req.body;

    var query = 'INSERT INTO post (post_id, post_date, post_name, post_content,post_status) VALUES (NULL, ?,?, ?,?)';
    connection.query(query, [dates, post_name, post_content,publicPrivate], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});


router.get('/posted', function(req, res, next) {


  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM post";
    connection.query(query, function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.post('/clubbed', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { dates, club_name, club_description } = req.body;
    // const { dates, post_name, post_content } = req.body;

    var query = 'INSERT INTO club (club_id, club_name,club_description,club_DOB) VALUES (NULL, ?,?,?)';
    connection.query(query, [club_name, club_description, dates], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }


      res.sendStatus(200);
    });
  });
});


router.get('/getClub', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM club";
    connection.query(query, function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});


// New(getting route)

router.post('/profile', function(req, res, next) {

res.json(req.session.user);





});


// inserting route


router.post('/set_profile', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
      if (err) {
          res.sendStatus(500);
          return;
      }
      const {
          first_name,
          last_name,
          email,
          phone,
          dob,
          course,
          password,
          username
      } = req.body;
      var query = 'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, course = ?, password = ?, username=? WHERE username = ?';
      connection.query(query, [first_name, last_name, email, phone, dob, course, password,
        username, req.session.user.user_nme], function(err2, rows, fields) {
          connection.release();
          if (err2) {
              res.sendStatus(500);
              return;
          }
          // Send the appropriate response
          req.session.user.user_nme=username;

          res.sendStatus(200);
      });
  });
});



router.post('/set_profile_manager', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
    if(err){
      res.sendStatus(500);
      return;
    }
const{
first_name,last_name,email,username
}=req.body;

  var query='INSERT INTO user (user_id,first_name,last_name,email,username) VALUES (NULL,?,?,?,?)';
connection.query(query,[first_name,last_name,email,username],function(err1,rows,fields){
    connection.release();
    if(err1){
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
    // res.json(rows);
  });
});
});



router.get('/showAddEvent', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/AddEvent', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const {
       dates, event_name, event_description,time,event_club
      } = req.body;
    // const { dates, post_name, post_content } = req.body;

    var query = 'INSERT INTO event (event_id, event_name,event_description,event_date,event_time,c_id) SELECT NULL,?,?,?,?, club_id FROM club WHERE club_name =?';
 /* var qu=INSERT INTO event(event_id,c_id,event_name,
 event_description,event_date,event_time,u_id) SELECT NULL,club_id,?,?,?,?, FROM; */

    connection.query(query, [event_name, event_description, dates,time,
      event_club,event_club], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});


router.get('/getEvent', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM event";
    connection.query(query, function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.get("/profiles", function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM user WHERE username=?";
    connection.query(query,[req.session.user.user_nme] ,function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.post("/joinClub", function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { club_name } = req.body;

  var query ="INSERT INTO manager (u_id, c_id) SELECT user.user_id, club.club_id FROM user JOIN club ON club.club_name = ? WHERE user.username = ?";
    connection.query(query,[club_name, req.session.user.user_nme] ,function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }

      res.json(rows);
    });
  });
});






router.get('/redirect', (req, res) => {
  if (req.session.user) {
    // Session exists

res.sendStatus(404);
  } else {

    // Session does not exist, redirect to another page
    res.redirect('/');
  }
});


router.get('/joinEvent', (req, res) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }


 var query = "INSERT INTO manager (u_id) SELECT user_id FROM user WHERE username = ?";

    connection.query(query,[req.session.user.user_nme] ,function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }

      res.json(rows);
    });
  });
});


// add users to

router.post('/addPersonClub', (req, res) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { club_name } = req.body;

    var query = "INSERT INTO club_list (u_id, c_id) SELECT user_id, club_id FROM user, club WHERE username = ? AND club_name =?";
    connection.query(query,[req.session.user.user_nme,club_name] ,function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }

      res.json(rows);

    });
  });
});


router.post('/EventJoiner', (req, res) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { club_name } = req.body;

   // var query = "INSERT INTO event_list (u_id, event_id) SELECT user_id,
   // event_id FROM user,event WHERE username = ? AND event_name =?";
    var query = "INSERT INTO event_list (u_id, event_id) SELECT DISTINCT user_id, event_id FROM user,event WHERE username = ? AND event_name =?";
    connection.query(query,[req.session.user.user_nme,club_name] ,function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }

      res.json(rows);

    });
  });
});
/* INSERT INTO club_list (u_id, c_id) SELECT DISTINCT user.user_id, club.club_id
FROM user INNER JOIN club ON 1 = 1 WHERE user.username = ? */



router.post('/showMember', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { club_name } = req.body;


    var query = "SELECT DISTINCT usr.* FROM user usr JOIN club_list clist ON usr.user_id = clist.u_id JOIN club clb ON clist.c_id = clb.club_id WHERE clb.club_name = ?";
    connection.query(query,[club_name] ,function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }

      res.json(rows);
    });
  });
});

router.post('/managerEvent', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { club_name } = req.body;


    var query = "SELECT DISTINCT usr.* FROM user usr JOIN event_list elist ON usr.user_id = elist.u_id JOIN event ev ON elist.event_id = ev.event_id WHERE ev.event_name = ?";
    connection.query(query,[club_name] ,function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }

      res.json(rows);
    });
  });
});



router.get('/googleAdd', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

      var query="INSERT INTO user (user_id,first_name,last_name,email,phone,dob,course,password,username) VALUES (NULL,'google_first_name','google_last_name','email','phone', 'dob','course','password',?)";
    connection.query(query,[req.session.user.user_nme],function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});


router.get('/memberEvent', function(req,res,next){


res.send(req.session.user.role);


});


router.get('/memberPost', function(req,res,next){


  res.send(req.session.user.role);


  });



router.post('/promoteAdmin', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { user_name } = req.body;
      var query="INSERT INTO admin (u_id) SELECT user_id FROM user WHERE username = ?";
    connection.query(query,[user_name],function(err1, rows, fields) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});


router.get('/memberEvent', function(req,res,next){


res.send(req.session.user.role);


});








router.post('/user_banned', (req, res, next) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { username } = req.body;

    var delete_user = "DELETE FROM user WHERE username = ? LIMIT 1";
    connection.query(delete_user, [username], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.post('/post_deleted', (req, res, next) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { post_name } = req.body;
    var delete_post = "DELETE FROM post WHERE post_name = ? LIMIT 1";
    connection.query(delete_post, [post_name], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.post('/admin_edit_post', (req, res, next) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { post_name, post_content, post_id } = req.body;
    var edit_post = "UPDATE post SET post_name = ?, post_content = ? WHERE post_id = ? LIMIT 1";
    connection.query(edit_post, [post_name, post_content, post_id], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.post('/admin_edit_user', (req, res, next) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const {
      username, first_name, last_name, email, user_id
    } = req.body;
  var edit_user = "UPDATE user SET username = ?, first_name = ?, last_name = ?,email = ? WHERE user_id = ? LIMIT 1";
    connection.query(edit_user, [username, first_name,
last_name, email, user_id], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.post('/club_deleted', (req, res, next) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { club_name } = req.body;

    var delete_club = "DELETE FROM club WHERE club_name = ? LIMIT 1";
    connection.query(delete_club, [club_name], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.post('/admin_edit_club', (req, res, next) => {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const { club_name, club_description, club_id } = req.body;
    var edit_club = "UPDATE club SET club_name = ?, club_description = ? WHERE club_id = ? LIMIT 1";
    connection.query(edit_club, [club_name, club_description, club_id], function(err1, rows) {
      connection.release();
      if (err1) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

/* router.get('/accessUserInfo',function(req,res,next){

  req.pool.getConnection(function(err,connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    const{ first_name,last_name,email,phone,dob_day,dob_month,dob_year,course,password,username
    }=req.body;

  var query='SELECT user (user_id,first_name,last_name,email,phone,dob_day,dob_month,
     VALUES (NULL,?,?,?,?,?,?,?,?,?,?)';
  connection.query(query,[first_name,last_name,email,phone,dob_day,dob_month,dob_year,
    course,password,username],function(err1,rows,fields){
    connection.release();
    if(err1){
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
    // res.json(rows);
  });
});
}); */

module.exports = router;

// SELECT user.*

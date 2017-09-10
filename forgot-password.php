<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
  <meta name="description" content="Research Study Encoding System">
  <meta name="author" content="Chris Rocco">
  <title>Forgot password | Big Data UAB</title>

  <?php require 'assets/partials/css-includes.html'; ?>

</head>
<body class="animsition page-forgot-password layout-full">
  <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
  <!-- Page -->
  <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
      <h2>Forgot Your Password ?</h2>
      <p>Input your registered email to reset your password</p>
      <form method="post" role="form" onsubmit="return submitRecoverForm()">
        <div class="form-group">
          <input type="email" class="form-control" id="inputEmail" name="email" placeholder="Your Email">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Reset Your Password</button>
        </div>
      </form>
      <footer class="page-copyright">
        <p>WEBSITE BY Chris Rocco</p>
        <p>© 2017. All RIGHT RESERVED.</p>
        <div class="social">
          <a class="btn btn-icon btn-pure" href="javascript:void(0)">
            <i class="icon bd-twitter" aria-hidden="true"></i>
          </a>
          <a class="btn btn-icon btn-pure" href="javascript:void(0)">
            <i class="icon bd-facebook" aria-hidden="true"></i>
          </a>
          <a class="btn btn-icon btn-pure" href="javascript:void(0)">
            <i class="icon bd-dribbble" aria-hidden="true"></i>
          </a>
        </div>
      </footer>
    </div>
  </div>
  <!-- End Page -->
  <?php require 'assets/partials/js-includes.html'; ?>

  <script src="/assets/examples/js/forgot-password.js"></script>
</body>
</html>
<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
  <meta name="description" content="Research Study Encoding System">
  <meta name="author" content="Chris Rocco">
  <title>Forgot password | Big Data UAB</title>
  <link rel="apple-touch-icon" href="..\assets/images/apple-touch-icon.png">
  <link rel="shortcut icon" href="..\assets/images/favicon.ico?v=2">
  <!-- Stylesheets -->
  <link rel="stylesheet" href="..\assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="..\assets/css/bootstrap-extend.min.css">
  <link rel="stylesheet" href="..\assets/css/site.min.css">
  <!-- Plugins -->
  <link rel="stylesheet" href="..\assets/vendor/animsition/animsition.css">
  <link rel="stylesheet" href="..\assets/vendor/asscrollable/asScrollable.css">
  <link rel="stylesheet" href="..\assets/vendor/switchery/switchery.css">
  <link rel="stylesheet" href="..\assets/vendor/intro-js/introjs.css">
  <link rel="stylesheet" href="..\assets/vendor/slidepanel/slidePanel.css">
  <link rel="stylesheet" href="..\assets/vendor/flag-icon-css/flag-icon.css">
  <link rel="stylesheet" href="..\assets/vendor/bootstrap-sweetalert/sweetalert.css">
  <link rel="stylesheet" href="..\assets/examples/css/pages/forgot-password.css">
  <!-- Fonts -->
  <link rel="stylesheet" href="..\assets/fonts/web-icons/web-icons.min.css">
  <link rel="stylesheet" href="..\assets/fonts/brand-icons/brand-icons.min.css">
  <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>
  <!--[if lt IE 9]>
    <script src="..\assets/vendor/html5shiv/html5shiv.min.js"></script>
    <![endif]-->
  <!--[if lt IE 10]>
    <script src="..\assets/vendor/media-match/media.match.min.js"></script>
    <script src="..\assets/vendor/respond/respond.min.js"></script>
    <![endif]-->
  <!-- Scripts -->
  <script src="..\assets/vendor/breakpoints/breakpoints.js"></script>
  <script>
  Breakpoints();
  </script>
</head>
<body class="animsition page-forgot-password layout-full">
  <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
  <!-- Page -->
  <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
      <h2>Reset Password</h2>
      <p>Please confirm your new password</p>
      <form name="resetForm" onsubmit="return submitResetForm()">
        <div class="form-group">
          <input name="password" type="password" class="form-control" id="password" placeholder="New Password">
        </div>
        <div class="form-group">
          <input name="confirmPassword" type="password" class="form-control" id="confirmPassword"
          placeholder="Confirm New Password">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Change Password</button>
        </div>
      </form>
      <footer class="page-copyright">
        <p>WEBSITE BY Chris Rocco</p>
        <p>© 2017. All RIGHT RESERVED.</p>
        <!--<div class="social">
            <a class="btn btn-icon btn-pure" href="javascript:void(0)">
              <i class="icon bd-twitter" aria-hidden="true"></i>
            </a>
            <a class="btn btn-icon btn-pure" href="javascript:void(0)">
              <i class="icon bd-facebook" aria-hidden="true"></i>
            </a>
            <a class="btn btn-icon btn-pure" href="javascript:void(0)">
              <i class="icon bd-dribbble" aria-hidden="true"></i>
            </a>
          </div>-->
      </footer>
    </div>
  </div>
  <!-- End Page -->
  <!-- Core  -->
  <script src="..\assets/vendor/babel-external-helpers/babel-external-helpers.js"></script>
  <script src="..\assets/vendor/jquery/jquery.js"></script>
  <script src="..\assets/vendor/tether/tether.js"></script>
  <script src="..\assets/vendor/bootstrap/bootstrap.js"></script>
  <script src="..\assets/vendor/animsition/animsition.js"></script>
  <script src="..\assets/vendor/mousewheel/jquery.mousewheel.js"></script>
  <script src="..\assets/vendor/asscrollbar/jquery-asScrollbar.js"></script>
  <script src="..\assets/vendor/asscrollable/jquery-asScrollable.js"></script>
  <!-- Plugins -->
  <script src="..\assets/vendor/switchery/switchery.min.js"></script>
  <script src="..\assets/vendor/intro-js/intro.js"></script>
  <script src="..\assets/vendor/screenfull/screenfull.js"></script>
  <script src="..\assets/vendor/slidepanel/jquery-slidePanel.js"></script>
  <script src="..\assets/vendor/bootstrap-sweetalert/sweetalert.js"></script>
  <!-- Scripts -->
  <script src="..\assets/js/State.js"></script>
  <script src="..\assets/js/Component.js"></script>
  <script src="..\assets/js/Plugin.js"></script>
  <script src="..\assets/js/Base.js"></script>
  <script src="..\assets/js/Config.js"></script>
  <script src="..\assets/js/URLs.js"></script>
  <script src="..\assets/js/Section/Menubar.js"></script>
  <script src="..\assets/js/Section/Sidebar.js"></script>
  <script src="..\assets/js/Section/PageAside.js"></script>
  <script src="..\assets/js/Plugin/menu.js"></script>
  <!-- Providers -->
  <script src="..\assets/js/AuthService.js"></script>
  <script src="..\assets/js/DataService.js"></script>
  <script src="..\assets/js/ApplicationService.js"></script>
  <!-- Config -->
  <script src="..\assets/js/config/colors.js"></script>
  <script src="..\assets/js/config/tour.js"></script>
  <script>
  Config.set('assets', '..\assets');
  </script>
  <!-- Page -->
  <script src="..\assets/js/Site.js"></script>
  <script src="..\assets/js/Plugin/asscrollable.js"></script>
  <script src="..\assets/js/Plugin/slidepanel.js"></script>
  <script src="..\assets/js/Plugin/switchery.js"></script>
  <script src="..\assets/examples/js/reset-password.js"></script>
  <script>
  (function(document, window, $) {
    $(document).ready(function() {
      ApplicationService.renderSession();
    });
  })(document, window, jQuery);
  </script>
</body>
</html>
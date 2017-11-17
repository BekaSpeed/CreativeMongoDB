angular.module('playlist',[])
  .controller('vidCtrl', [
  '$scope','$http',
  function($scope,$http) {
    $scope.videos = [];
    $scope.create = function(playlist) {
      return $http.post('/playlist', playlist).success(function(data){
       console.log("Successfully added shiz");
       $scope.videos.push(data);
      });
    };
    $scope.addVideo = function() {
      var newVideo = {title:$scope.userList,url:$scope.userUrl};
      $scope.create({
         title: $scope.userList,
         url: $scope.userUrl,
      });
      $scope.userList = "";
      $scope.userUrl = "";
    };
    $("#getVideos").click(function() {
    $.getJSON('video', function(data) {
      console.log(data);
      var everything = "";
      everything += "<div class=""+carousel slide+"" data-ride="carousel"><div class=""+carousel-inner+"">";
      for(var video in data) {
        vid = data[video];
        everything += "<div class="carousel-item"><iframe width="560" height="315" src="https://www.youtube.com/embed/"+vid.userUrl+"" frameborder="0" allowfullscreen></iframe>";
	everything += "<div class="carousel-caption d-none d-md-block"><h3>vid.userList</h3></div>";
      }
      everything += "</div>";
      $("#videos").html(everything);
    });
  });
  }
]);
if (!window['YT']) {var YT = {loading: 0,loaded: 0};}
if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}
if (!YT.loading) {
	YT.loading = 1;
	(function(){
		var l = [];
		YT.ready = function(f) {
			if (YT.loaded) {
				f();
				} 
				else {
					l.push(f);
					}
		};
		window.onYTReady = function() {
			YT.loaded = 1;
			for (var i = 0; i < l.length; i++) {
				try {l[i]();} catch (e) {}}};
				YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};
				var a = document.createElement('script');
				a.type = 'text/javascript';
				a.id = 'www-widgetapi-script';
				a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vflnzpyZ4/www-widgetapi.js';
a.async = true;var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}


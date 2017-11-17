angular.module('video',[])
  .controller('vidCtrl', [
  '$scope','$http',
  function($scope,$http) {
    $scope.videos = [];
    $scope.create = function(video) {
      return $http.post('/playlist', video).success(function(data){
        $scope.videos.push(data);
      });
    };
    $scope.addVideo = function() {
      var newVideo = {title:$scope.userList,url:$scope.userUrl,upvotes:0};
      $scope.create({
        title: $scope.userList,
	url: $scope.userUrl,
        upvotes: 0,
      });
      $scope.userList = "";
      $scope.userUrl = "";
    };
    $scope.incrementUpvotes = function (video) {
      $scope.upvote(video);
    };
    $scope.upvote = function(video) {
      return $http.put('/playlist/' + video._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          video.upvotes += 1;
        });
    };
    $scope.getAll = function() {
      return $http.get('/playlist').success(function(data){
        angular.copy(data, $scope.videos);
      });
    };
    $scope.getAll();
    $scope.delete = function(video) {
      $http.delete('/playlist/' + video._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
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


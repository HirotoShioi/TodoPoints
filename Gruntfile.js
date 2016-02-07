module.exports = function(grunt) {
  grunt.initConfig({
    // タスクの設定
    cssmin : {
   pc : {
     src : ['public/stylesheets/style.css'],
     dest : 'css/style.min.css'
   }
 }
  });
  //　プラグインのロード
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
